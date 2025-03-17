"use client";
import { api } from "@repo/utils/api";


const checkDocument = async (documentID: string) => {
    try {
        const res = await api.post("/documents/authorize", {documentID});
        return res;
    } catch (error) {
        console.log(error);
        return;
    }
}
export default  function DocumentLayout({children}: {
    children: React.ReactNode;
}){
    // const doc = await api.post("/documents/authorize", {})
    const url = new URL(window.location.href);
    const documentId = url.pathname.split("/").pop();
    const res = checkDocument(documentId as string);
    console.log(res);

    
    return (
        <>
            {children}
        </>
    )
}