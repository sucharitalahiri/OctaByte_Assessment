import express from "express";
import portfolioRoutes from "./routes/portfolio.routes";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/portfolio", portfolioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});