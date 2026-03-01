import { PortfolioResponse } from "../types/portfolio.types";

export const fetchPortfolio = async (): Promise<PortfolioResponse> => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch portfolio");
  }

  return res.json();
};