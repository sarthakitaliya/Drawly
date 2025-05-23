import { prismaClient } from "@repo/db/client"
import { Request, Response } from "express";

export const convertToCollab = async (req: Request, res: Response) => {
    try {
        const {documentId} = req.body;
        if(!documentId){
            res.status(400).json({success: false, message: "Document id is required"})
            return;
        }
        await prismaClient.document.update({
            where:{
                id: documentId
            },
            data:{
                isCollaborative: true
            }
        })
        await prismaClient.member.create({
            data:{
                documentId: documentId,
                userId: req.user.id
            }
        })
        res.status(200).json({success: true})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"})     
    }
}

export const checkAccess = async (req: Request, res: Response) => {
    try {
        console.log("Checking access");
        console.log(req.body);
        const {documentId} = req.body;
        if(!documentId){
            res.status(400).json({success: false, message: "Document id is required"})
            return;
        }
        const document = await prismaClient.document.findUnique({
            where:{
                id: documentId
            }
        })
        console.log(document);
        
        if(document){
            if(document.isCollaborative){
                console.log("Document is collaborative");
                let member = await prismaClient.member.findFirst({
                    where:{
                        documentId: documentId,
                        userId: req.user.id
                    }
                })
                console.log("Member before creating", member);
                if(!member){
                    console.log("User is not a member");
                    member = await prismaClient.member.create({
                        data:{
                            documentId: documentId,
                            userId: req.user.id
                        }
                    })
                }
                console.log(member);
                res.status(200).json({success: true, document})
            }else{
                console.log("Document is not collaborative");
                res.status(200).json({success: true, message: "Document is not collaborative"})
            }
        }else{
            console.log("Document not found");
            res.status(404).json({success: false, message: "Document not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getAllMembers = async (req: Request, res: Response) => {
    try {
        const {documentId} = req.params;
        if(!documentId){
            res.status(400).json({success: false, message: "Document id is required"})
            return;
        }
        const members = await prismaClient.member.findMany({
            where:{
                documentId: documentId
            },
            include:{
                user: true
            }
        })
        if(members){
            res.status(200).json({success: true, members})
        }else{
            res.status(404).json({success: false, message: "Members not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}