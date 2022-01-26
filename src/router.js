import express from "express";
import TeamsRouter from "./teams/teams.router";

const router = express.Router();
router.use("/teams", TeamsRouter);

export default router;
