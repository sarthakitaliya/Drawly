import { api } from "@repo/utils/api";

export const setSessionStorage = async () => {
  try {
    const documents = await fetchDocuments();
    const documentIds = documents.map((document: any) => document.id);
    sessionStorage.setItem("documentIds", JSON.stringify(documentIds));
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
