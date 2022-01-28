import express from "express";
import TeamsRouter from "./teams/teams.router";
import DriversRouter from "./drivers/drivers.router";

const router = express.Router();
router.use("/teams", TeamsRouter);
router.use("/drivers", DriversRouter);

export default router;
