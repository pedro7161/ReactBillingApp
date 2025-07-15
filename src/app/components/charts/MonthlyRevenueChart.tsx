'use client';

import { useState } from "react";
import { Card, CardContent, Typography, MenuItem, Select } from "@mui/material";
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
};

const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function MonthlyRevenueChart({ data }: Props) {
  // State to track selected year index
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);

  // Data for the selected year
  const selectedYearData = data[selectedYearIndex];
  const chartData = selectedYearData.monthlyRevenue.map((value, index) => ({
    name: monthLabels[index],
    value,
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Receita Mensal - {selectedYearData.yearLabel}
        </Typography>

        {/* Year selector dropdown */}
        <Select
          value={selectedYearIndex}
          onChange={(e) => setSelectedYearIndex(Number(e.target.value))}
          sx={{ mb: 2 }}
        >
          {data.map((year, index) => (
            <MenuItem key={year.yearLabel} value={index}>
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
