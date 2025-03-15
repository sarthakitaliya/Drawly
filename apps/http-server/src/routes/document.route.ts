import express, { Router } from "express";  
import { createDocument, getAllDocuments, getAllShapes } from "../controllers/document.controller";

const router: Router = express.Router();

//get all documents
router.get("/", getAllDocuments )

//create document
router.post("/", createDocument)

//getting all shapes for single document
router.get("/:id", getAllShapes)

export default router;