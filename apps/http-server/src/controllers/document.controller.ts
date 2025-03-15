import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";


export const getAllDocuments = async(req: Request, res: Response) => {
    try {
        res.send("hey");
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }

}


export const createDocument = async(req: Request, res: Response) => {
    try {
        const {slug} = req.body;
        console.log(slug);
        
        const createDoc = await prismaClient.document.create({
            data: {
                ownerId: req.user.id,
                slug: slug || "Untitled"
            }
        }) 
        console.log(createDoc);
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



export const getAllShapes = async(req: Request, res: Response) => {}