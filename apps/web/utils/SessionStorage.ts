import { api } from "@repo/utils/api";

export const setSessionStorage = async () => {
  try {
    const documents = await fetchDocuments();
    if (!documents) return;
    const documentIdAndIsCollab = documents.map((document: any) => ({
      id: document.id,
      isCollaborative: document.isCollaborative,
    }));
    localStorage.setItem("documentIds", JSON.stringify(documentIdAndIsCollab));
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

export const checkisCollaborative = (documentId: string) => {
  const cachedDocuments = JSON.parse(
    localStorage.getItem("documentIds") || "[]"
  );
  const findId = cachedDocuments.find((doc: any) => doc.id === documentId);
  return findId.isCollaborative;
};

export const checkDocumentAccess = async (documentId: string) => {
  const cachedDocuments = JSON.parse(
    localStorage.getItem("documentIds") || "[]"
  );
  const findId = cachedDocuments.find((doc: any) => doc.id === documentId);
  if (findId) {
    return { status: true, isCollab: findId.isCollaborative };
  } else {
    try {
      const res = await api.post("/room/access", { documentId });
      console.log(res.data);

      if (res.data.success) {
        const document = res.data.document;
        const cachedDocuments = JSON.parse(
          localStorage.getItem("documentIds") || "[]"
        );
        cachedDocuments.push({
          id: document.id,
          isCollaborative: document.isCollaborative,
        });
        localStorage.setItem("documentIds", JSON.stringify(cachedDocuments));
        console.log("Document access granted");

        return { status: true, isCollab: document.isCollaborative };
      } else {
        return { status: false, isCollab: false};
      }
    } catch (error) {
      console.log(error);
      return { status: false, isCollab: false};
    }
  }
};
