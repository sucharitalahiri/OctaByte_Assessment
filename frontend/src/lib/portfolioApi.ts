import { PortfolioResponse } from "../types/portfolio.types";

export const fetchPortfolio = async (): Promise<PortfolioResponse> => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Backend error: ${res.status}`);
  }

  return res.json();
};