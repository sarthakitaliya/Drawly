import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await prismaClient.document.findMany({
      where: {
        OR: [
          { ownerId: req.user.id },
          { members: { some: { userId: req.user.id } } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        ownerId: true,
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        members: {
          select: {
            id: true,
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        createdAt: true,
        isCollaborative: true,
      },
    });
    res.json({
      success: true,
      documents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createDocument = async (req: Request, res: Response) => {
  try {
    const { slug, isCollab } = req.body;

    const createDoc = await prismaClient.document.create({
      data: {
        ownerId: req.user.id,
        slug: slug || "Untitled",
        isCollaborative: false,
      },
    });
    res.json({
      success: true,
      createDoc,
      message: "Document created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllShapes = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.body;
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
};

export const addShape = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.body;

    if (!documentId) {
      res.status(400).json({
        success: false,
        message: "Document ID is required",
      });
      return;
    }
    const { shape } = req.body;
    if (!shape) {
      res.status(400).json({
        success: false,
        message: "Shape is required",
      });
      return;
    }
    let addShape;
    if (shape.type === "line") {
      addShape = await prismaClient.shape.create({
        data: {
          type: shape.type,
          documentId,
          x: shape.x,
          y: shape.y,
          x2: shape.x2,
          y2: shape.y2,
        },
      });
    } else {
      addShape = await prismaClient.shape.create({
        data: {
          documentId,
          type: shape.type,
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height,
        },
      });
    }

    res.json({
      success: true,
      addShape,
      message: "Shape added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const authorizeDocumentAccess = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.body;

    if (!documentId) {
      res.status(400).json({
        success: false,
        message: "Document ID is required",
      });
      return;
    }
    const document = await prismaClient.document.findFirst({
      where: {
        id: documentId,
        OR: [
          { ownerId: req.user.id },
          { members: { some: { id: req.user.id } } },
        ],
      },
    });
    if (!document) {
      res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
      return;
    }
    res.json({
      success: true,
      message: "Authorized access",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.params;

    if (!documentId) {
      res.status(400).json({
        success: false,
        message: "Document ID is required",
      });
      return;
    }
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
    if (document.ownerId !== req.user.id) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to delete this document",
      });
      return;
    }
    await prismaClient.document.delete({
      where: {
        id: documentId,
      },
    });
    res.json({
      success: true,
      message: "Document deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const renameDocument = async (req: Request, res: Response) => {
  try {
    const { documentId } = req.params;
    const { name } = req.body;

    if (!documentId) {
      res.status(400).json({
        success: false,
        message: "Document ID is required",
      });
      return;
    }
    if (!name) {
      res.status(400).json({
        success: false,
        message: "Document name is required",
      });
      return;
    }
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
    if (document.ownerId !== req.user.id) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to rename this document",
      });
      return;
    }
    await prismaClient.document.update({
      where: {
        id: documentId,
      },
      data: {
        slug: name,
      },
    });
    res.json({
      success: true,
      message: "Document renamed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
