import { portfolio, Stock } from "../models/Stock";
import { fetchCMP } from "./yahoo.service";

/* -------------------- Interfaces -------------------- */

interface EnrichedStock extends Stock {
  investment: number;
  portfolioPercent: number;
  cmp: number | null;
  presentValue: number | null;
  gainLoss: number | null;
  gainLossPercent: number | null;
}

interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  sectorPercent: number;
}

// interface PortfolioResponse {
//   stocks: EnrichedStock[];
//   sectors: SectorSummary[];
// }

interface PortfolioResponse {
  summary: PortfolioSummary;
  stocks: EnrichedStock[];
  sectors: SectorSummary[];
}

interface PortfolioSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  overallPercent: number;
}

/* -------------------- Service -------------------- */

export const calculatePortfolio = async (): Promise<PortfolioResponse> => {

  /* Calculate investment per stock */
  const stocksWithInvestment = portfolio.map((stock) => ({
    ...stock,
    investment: stock.purchasePrice * stock.quantity,
  }));

  /*  Calculate total portfolio investment */
  const totalInvestment = stocksWithInvestment.reduce(
    (total, stock) => total + stock.investment,
    0
  );

  /* Enrich stocks with CMP + gain/loss */
  const enrichedStocks: EnrichedStock[] = await Promise.all(
    stocksWithInvestment.map(async (stock) => {

      const cmp = await fetchCMP(stock.symbol);

      const presentValue =
        cmp !== null ? cmp * stock.quantity : null;

      const gainLoss =
        presentValue !== null
          ? presentValue - stock.investment
          : null;

      const gainLossPercent =
        gainLoss !== null
          ? (gainLoss / stock.investment) * 100
          : null;

      const portfolioPercent =
        (stock.investment / totalInvestment) * 100;

      return {
        ...stock,
        portfolioPercent,
        cmp,
        presentValue,
        gainLoss,
        gainLossPercent,
      };
    })
  );

  /*  Sector Aggregation */
  const sectorMap: Record<string, SectorSummary> = {};

  enrichedStocks.forEach((stock) => {
    if (!sectorMap[stock.sector]) {
      sectorMap[stock.sector] = {
        sector: stock.sector,
        totalInvestment: 0,
        totalPresentValue: 0,
        totalGainLoss: 0,
        sectorPercent: 0,
      };
    }

    sectorMap[stock.sector].totalInvestment += stock.investment;
    sectorMap[stock.sector].totalPresentValue += stock.presentValue ?? 0;
    sectorMap[stock.sector].totalGainLoss += stock.gainLoss ?? 0;
  });

  const sectors: SectorSummary[] = Object.values(sectorMap).map(
    (sector) => ({
      ...sector,
      sectorPercent:
        (sector.totalInvestment / totalInvestment) * 100,
    })
  );
  /* 5️⃣ Calculate Overall Portfolio Summary */

const totalPresentValue = enrichedStocks.reduce(
  (total, stock) => total + (stock.presentValue ?? 0),
  0
);

const totalGainLoss = totalPresentValue - totalInvestment;

const overallPercent =
  totalInvestment !== 0
    ? (totalGainLoss / totalInvestment) * 100
    : 0;

const summary: PortfolioSummary = {
  totalInvestment,
  totalPresentValue,
  totalGainLoss,
  overallPercent,
};

  /* Return structured response */
//   return {
//     stocks: enrichedStocks,
//     sectors,
//   };
return {
  summary,
  stocks: enrichedStocks,
  sectors,
};
};