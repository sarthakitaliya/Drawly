import { api } from "@repo/utils/api";

export const setSessionStorage = async () => {
  try {
    const documents = await fetchDocuments();
    const documentIdAndIsCollab = documents.map((document: any) => ({
      id: document.id,
      isCollaborative: document.isCollaborative,
      ownerId: document.ownerId,
    }));
    sessionStorage.setItem(
      "documentIds",
      JSON.stringify(documentIdAndIsCollab)
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchDocuments = async () => {
  try {
    const res = await api.get("/documents");
    return res.data.documents;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const checkDocumentAccess = async (documentId: string) => {
  const cachedDocuments = JSON.parse(
    sessionStorage.getItem("documentIds") || "[]"
  );

  if (cachedDocuments.find((doc: any) => doc.id === documentId)) {
    return true;
  } else {
    try {
      const res = await api.post("/room/access", { documentId });
      if (res.data.success) {
        const document = res.data.document;
        const cachedDocuments = JSON.parse(
          sessionStorage.getItem("documentIds") || "[]"
        );
        cachedDocuments.push({
          id: document.id,
          isCollaborative: document.isCollaborative,
        });
        sessionStorage.setItem("documentIds", JSON.stringify(cachedDocuments));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};
