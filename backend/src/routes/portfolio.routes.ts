import express from "express";
import { getPortfolio } from "../controllers/portfolio.controller";

const router = express.Router();

router.get("/", getPortfolio);

export default router;