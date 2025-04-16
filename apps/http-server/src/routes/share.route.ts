import express, { Router } from "express";
import { checkAccess, getAllShapes } from "../controllers/share.controller";

const router: Router = express.Router();

router.get("/shapes/:documentId", getAllShapes);

router.post("/access", checkAccess);

export default router;