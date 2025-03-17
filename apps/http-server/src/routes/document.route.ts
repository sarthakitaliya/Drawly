import express, { Router } from "express";  
import { createDocument, getAllDocuments, getAllShapes, addShape, authorizeDocumentAccess } from "../controllers/document.controller";

const router: Router = express.Router();

//get all documents
router.get("/", getAllDocuments )

//create document
router.post("/", createDocument)

//authorize user
router.post("/authorize", authorizeDocumentAccess)

//getting all existing shapes for single document
router.post("/shapes", getAllShapes)

//add shape to document
router.post("/add-shape", addShape)

export default router;