import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();
const formatSymbolForYahoo = (symbol: string): string => {
  const isNumeric = /^\d+$/.test(symbol);

  if (isNumeric) {
    return `${symbol}.BO`; // BSE
  }

  return `${symbol}.NS`; // NSE
};

// export const fetchCMP = async (symbol: string): Promise<number | null> => {
//   try {
//     const formattedSymbol = formatSymbolForYahoo(symbol);

//     const quote: any = await yahooFinance.quote(formattedSymbol);

//     return quote?.regularMarketPrice ?? null;
//   } catch (error) {
//     console.error("Yahoo API Error:", error);
//     return null; // Fail gracefully
//   }
// };

export const fetchCMP = async (symbol: string): Promise<number | null> => {
  try {
    const formattedSymbol = formatSymbolForYahoo(symbol);

    console.log("Fetching:", formattedSymbol);

    const quote = await yahooFinance.quoteSummary(formattedSymbol, {
      modules: ["price"]
    }) as any;

    return quote?.price?.regularMarketPrice ?? null;

  } catch (error) {
    console.error("Yahoo API Error:", error);
    return null;
  }
};

