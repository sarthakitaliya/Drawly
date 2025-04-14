import express, { Router } from "express";
import { convertToCollab, checkAccess, getAllMembers } from "../controllers/room.controller";

const router: Router = express.Router();

router.post("/collab", convertToCollab)

router.post("/access", checkAccess)

router.get("/members/:documentId", getAllMembers)

export default router;