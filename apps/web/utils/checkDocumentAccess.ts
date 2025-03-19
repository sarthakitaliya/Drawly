

export const checkDocumentAccess = (documentId: string) => {
    const cachedDocuments = JSON.parse(sessionStorage.getItem("documentIds") || "[]");
    console.log("cachedDocuments",cachedDocuments);
    
    if (cachedDocuments.includes(documentId)) {
        return true;
    }
    else {
        return false;
    }
}