import { Request, Response } from "express";
import { calculatePortfolio } from "../services/portfolio.service";

export const getPortfolio = async (
  req: Request,
  res: Response
) => {
  try {
    const portfolioData = await calculatePortfolio();
    res.json(portfolioData);
  } catch (error) {
    res.status(500).json({
      message: "Error calculating portfolio",
    });
  }
};