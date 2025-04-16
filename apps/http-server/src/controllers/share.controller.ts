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