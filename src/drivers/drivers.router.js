import DriversController from "./drivers.controller";

import express from "express";
const router = express.Router();

router.get("/", DriversController.getAll);
router.get("/:id", DriversController.getById);
router.post("/", DriversController.insert);
router.put("/:id", DriversController.update);
router.delete("/:id", DriversController.deleteById);

export default router;
