export const formatCurrency = (value: number | null) => {
  if (value === null) return "-";
  return `₹ ${value.toFixed(2)}`;
};

export const formatPercent = (value: number | null) => {
  if (value === null) return "-";
  return `${value.toFixed(2)} %`;
};