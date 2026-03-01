export interface PortfolioSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  overallPercent: number;
}

export interface EnrichedStock {
  id: number;
  stockName: string;
  symbol: string;
  purchasePrice: number;
  quantity: number;
  sector: string;
  investment: number;
  portfolioPercent: number;
  cmp: number | null;
  presentValue: number | null;
  gainLoss: number | null;
  gainLossPercent: number | null;
}

export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  sectorPercent: number;
}

export interface PortfolioResponse {
  summary: PortfolioSummary;
  stocks: EnrichedStock[];
  sectors: SectorSummary[];
}