// MonthlyRevenueChart.tsx
'use client';

import { Card, CardContent, Typography, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Represents yearly billing data for a single year.
 */
type YearlyBillingData = {
  /** Array of monthly revenue values (indexed Jan to Dec) */
  monthlyRevenue: number[];
  /** Total annual revenue for the year */
  annualRevenue: number;
  /** Number of invoices issued that year */
  invoicesIssued: number;
  /** Number of active clients in that year */
  activeClients: number;
  /** Year label (e.g., "2023") */
  yearLabel: string;
};

/**
 * Props for the MonthlyRevenueChart component.
 */
type Props = {
  /** Array of billing data for each year */
  data: YearlyBillingData[];
  /** Index of the currently selected year in the data array */
  selectedYearIndex: number;
  /** Callback triggered when a new year is selected */
  onYearChange: (index: number) => void;
};

/** Labels for each month in abbreviated format (Portuguese) */
const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

/**
 * Renders a responsive line chart of monthly revenue for a selected year,
 * with a dropdown to switch between years.
 *
 * @component
 * @param {Props} props - Component props.
 * @returns {JSX.Element} A chart card displaying revenue trends.
 */
export default function MonthlyRevenueChart({ data, selectedYearIndex, onYearChange }: Props) {
  const selectedYearData = data[selectedYearIndex];

  // Transform raw data into chart-friendly format
  const chartData = selectedYearData.monthlyRevenue.map((value, index) => ({
    name: monthLabels[index],
    value,
  }));

  /**
   * Handles the year selection change from dropdown.
   * @param {SelectChangeEvent} e - Selection change event
   */
  const handleYearChange = (e: SelectChangeEvent) => {
    onYearChange(Number(e.target.value));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Receita Mensal - {selectedYearData.yearLabel}
        </Typography>

        <Select
          value={String(selectedYearIndex)}
          onChange={handleYearChange}
          sx={{ mb: 2, minWidth: 120 }}
        >
          {data.map((year, index) => (
            <MenuItem key={year.yearLabel} value={String(index)}>
              {year.yearLabel}
            </MenuItem>
          ))}
        </Select>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
