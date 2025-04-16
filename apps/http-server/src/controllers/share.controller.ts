import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export const getAllShapes = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.params;
    if (!documentId) {
      res.status(400).json({
        success: false,
        message: "Document ID is required",
      });
      return;
    }
    const shapes = await prismaClient.shape.findMany({
      where: {
        documentId,
      },
    });
    res.json({
      success: true,
      shapes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const checkAccess = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.body;   
    const document = await prismaClient.document.findUnique({
      where: {
        id: documentId,
      },
    });
    if (!document) {
      res.status(404).json({
        success: false,
        message: "Document not found",
      });
      return;
    }
    if (document.isCollaborative) {
      res.status(200).json({
        success: true,
        message: "Document is collaborative",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "You are not allowed to access this document",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    
  }
}