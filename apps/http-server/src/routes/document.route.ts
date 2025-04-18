import express, { Router } from "express";  
import { createDocument, getAllDocuments, getAllShapes, addShape, authorizeDocumentAccess, deleteDocument, renameDocument } from "../controllers/document.controller";

const router: Router = express.Router();

//get all documents
router.get("/", getAllDocuments )

//create document
router.post("/", createDocument)


//getting all existing shapes for single document
router.post("/shapes", getAllShapes)

//add shape to document
router.post("/add-shape", addShape)

// delete document
router.delete("/:documentId", deleteDocument)

// rename document
router.put("/:documentId", renameDocument)

export default router;