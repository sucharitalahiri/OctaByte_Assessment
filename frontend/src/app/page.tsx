export const dynamic = "force-dynamic";
import { fetchPortfolio } from "../lib/portfolioApi";
import { formatCurrency, formatPercent } from "../lib/format";

export default async function Home() {
  const data = await fetchPortfolio();

  return (
    <div className="container">
      <h1>Portfolio Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="card-row">
        <div className="card">
          <h3>Total Investment</h3>
          <p>{formatCurrency(data.summary.totalInvestment)}</p>
        </div>

        <div className="card">
          <h3>Total Present Value</h3>
          <p>{formatCurrency(data.summary.totalPresentValue)}</p>
        </div>

        <div className="card">
          <h3>Total Gain/Loss</h3>
          <p
            className={
              data.summary.totalGainLoss >= 0
                ? "positive"
                : "negative"
            }
          >
            {formatCurrency(data.summary.totalGainLoss)}
          </p>
        </div>

        <div className="card">
          <h3>Overall %</h3>
          <p
            className={
              data.summary.overallPercent >= 0
                ? "positive"
                : "negative"
            }
          >
            {formatPercent(data.summary.overallPercent)}
          </p>
        </div>
      </div>

      {/* STOCK TABLE */}
      <h2>Stocks</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sector</th>
            <th>Investment</th>
            <th>CMP</th>
            <th>Present Value</th>
            <th>Gain/Loss</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {data.stocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.stockName}</td>
              <td>{stock.sector}</td>
              <td>{formatCurrency(stock.investment)}</td>
              <td>{formatCurrency(stock.cmp)}</td>
              <td>{formatCurrency(stock.presentValue)}</td>
              <td
                className={
                  stock.gainLoss !== null && stock.gainLoss >= 0
                    ? "positive"
                    : "negative"
                }
              >
                {formatCurrency(stock.gainLoss)}
              </td>
              <td
                className={
                  stock.gainLossPercent !== null &&
                  stock.gainLossPercent >= 0
                    ? "positive"
                    : "negative"
                }
              >
                {formatPercent(stock.gainLossPercent)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SECTOR TABLE */}
      <h2>Sector Summary</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sector</th>
            <th>Total Investment</th>
            <th>Total Present Value</th>
            <th>Total Gain/Loss</th>
            <th>% Allocation</th>
          </tr>
        </thead>
        <tbody>
          {data.sectors.map((sector) => (
            <tr key={sector.sector}>
              <td>{sector.sector}</td>
              <td>{formatCurrency(sector.totalInvestment)}</td>
              <td>{formatCurrency(sector.totalPresentValue)}</td>
              <td
                className={
                  sector.totalGainLoss >= 0
                    ? "positive"
                    : "negative"
                }
              >
                {formatCurrency(sector.totalGainLoss)}
              </td>
              <td>{formatPercent(sector.sectorPercent)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}