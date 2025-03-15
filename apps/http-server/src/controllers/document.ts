import { Request, Response } from "express";


export const getAllDocuments = async(req: Request, res: Response) => {
    try {
        res.send("hey");
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }

}


export const createDocument = async(req: Request, res: Response) => {}



export const getAllShapes = async(req: Request, res: Response) => {}