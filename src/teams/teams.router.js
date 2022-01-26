import express from "express";
import TeamsController from "./teams.controller";

const router = express.Router();

router.get("/", TeamsController.getAll);
router.get("/:id", TeamsController.getById);
router.post("/", TeamsController.insert);
router.put("/:id", TeamsController.update);
router.delete("/:id", TeamsController.deleteById);

export default router;
