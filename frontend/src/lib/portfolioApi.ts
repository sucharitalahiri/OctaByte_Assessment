import { PortfolioResponse } from "../types/portfolio.types";

export const fetchPortfolio = async (): Promise<PortfolioResponse> => {
  const res = await fetch("http://localhost:3000/portfolio", {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch portfolio");
  }

  return res.json();
};