import express, { Router } from "express";
import { convertToCollab, checkAccess } from "../controllers/room.controller";

const router: Router = express.Router();

router.post("/collab", convertToCollab)

router.post("/access", checkAccess)

export default router;