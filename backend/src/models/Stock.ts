export interface Stock {
  id: number;
  stockName: string;
  symbol: string;
  purchasePrice: number;
  quantity: number;
  sector: string;
}

export const portfolio: Stock[] = [
  {
    id: 1,
    stockName: "HDFC Bank",
    symbol: "HDFCBANK",
    purchasePrice: 1490,
    quantity: 50,
    sector: "Financial",
  },
  {
    id: 2,
    stockName: "Bajaj Finance",
    symbol: "BAJFINANCE",
    purchasePrice: 6466,
    quantity: 15,
    sector: "Financial",
  },
  {
    id: 3,
    stockName: "ICICI Bank",
    symbol: "532174",
    purchasePrice: 780,
    quantity: 84,
    sector: "Financial",
  },
  {
    id: 4,
    stockName: "Affle India",
    symbol: "AFFLE",
    purchasePrice: 1151,
    quantity: 50,
    sector: "Technology",
  }
];