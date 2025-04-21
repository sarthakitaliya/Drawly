import express, { Router } from "express";  
import { createDocument, getAllDocuments, getAllShapes, addShape, authorizeDocumentAccess, deleteDocument, renameDocument, clearShapes, overwriteCanvas } from "../controllers/document.controller";

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

//clear document
router.delete("/clear/:documentId", clearShapes)

// overwrite canvas
router.post("/shapes/overwrite", overwriteCanvas)

export default router;