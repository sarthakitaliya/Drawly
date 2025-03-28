import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";


export const getAllDocuments = async(req: Request, res: Response) => {
    try {
        const documents = await prismaClient.document.findMany({
            where: {
                OR:[
                    {ownerId: req.user.id},
                    {members: {some: {userId: req.user.id}}}
                ]
            },
            orderBy:{
                createdAt: "desc"
            },
            select:{
                id: true,
                slug: true,
                ownerId: true,
                owner: {
                    select:{
                        id: true,
                        name: true,
                    }
                },
                members: true,
                createdAt: true,
                isCollaborative: true
            }
        })
        res.json({
            success: true,
            documents
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, 
            message: "Internal server error"
        })
    }

}


export const createDocument = async(req: Request, res: Response) => {
    try {
        const {slug, isCollab} = req.body;
        
        const createDoc = await prismaClient.document.create({
            data: {
                ownerId: req.user.id,
                slug: slug || "Untitled",
                isCollaborative: false,
            }
        }) 
        res.json({
            success: true,
            createDoc,
            message: "Document created"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}



export const getAllShapes = async(req: Request, res: Response) => {
    try {
        const {documentId} = req.body;
        if(!documentId) {
            res.status(400).json({
                success: false,
                message: "Document ID is required"
            })
            return;
        }
        const shapes = await prismaClient.shape.findMany({
            where: {
                documentId
            }
        })
        res.json({
            success: true,
            shapes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export const addShape = async(req: Request, res: Response) => {
    try {
        const {documentId} = req.body;
        
        if(!documentId) {
             res.status(400).json({
                success: false,
                message: "Document ID is required"
            })
            return;
        }
        const {shape} = req.body ;
        if(!shape) {
            res.status(400).json({
                success: false,
                message: "Shape is required"
            })
            return;
        }
        const addShape = await prismaClient.shape.create({
            data: {
                documentId,
                type: shape.type,
                x: shape.x,
                y: shape.y,
                width: shape.width,
                height: shape.height,
            }
        })
        
        res.json({
            success: true,
            addShape,
            message: "Shape added"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        
    }
}

export const authorizeDocumentAccess = async(req: Request, res: Response) => {
    try {
        const {documentId} = req.body;
        
        if(!documentId) {
            res.status(400).json({
                success: false,
                message: "Document ID is required"
            })
            return;
        }
        const document = await prismaClient.document.findFirst({
            where: {
                id: documentId,
                OR:[
                    {ownerId: req.user.id},
                    {members: {some: {id: req.user.id}}}
                ]
            }
        })
        if(!document) {
            res.status(403).json({
                success: false,
                message: "Unauthorized access"
            })
            return;
        }
        res.json({
            success: true,
            message: "Authorized access"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}