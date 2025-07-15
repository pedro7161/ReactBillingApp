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

type YearlyBillingData = {
  monthlyRevenue: number[];
  annualRevenue: number;
  invoicesIssued: number;
  activeClients: number;
  yearLabel: string;
};

type Props = {
  data: YearlyBillingData[];
  selectedYearIndex: number;
  onYearChange: (index: number) => void;
};

const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function MonthlyRevenueChart({ data, selectedYearIndex, onYearChange }: Props) {
  const selectedYearData = data[selectedYearIndex];
  const chartData = selectedYearData.monthlyRevenue.map((value, index) => ({
    name: monthLabels[index],
    value,
  }));

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
