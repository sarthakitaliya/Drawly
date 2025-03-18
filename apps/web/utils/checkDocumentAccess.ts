

export const checkDocumentAccess = (documentId: string) => {
    const cachedDocuments = JSON.parse(sessionStorage.getItem("documentIds") || "[]");
    
    if (cachedDocuments.includes(documentId)) {
        return true;
    }
    else {
        return false;
    }
}