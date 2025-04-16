import express, { Router } from "express";
import { getAllShapes } from "../controllers/share.controller";

const router: Router = express.Router();

router.get("/shapes/:documentId", getAllShapes);

export default router;