'use client';

import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type AnnualDataItem = {
  annualRevenue: number;
  yearLabel: string;
};

type Props = {
  data: AnnualDataItem[];
};

export default function AnnualRevenueChart({ data }: Props) {
  // Mapeia os dados para o formato esperado pelo Recharts
  const chartData = data.map(({ annualRevenue, yearLabel }) => ({
    name: yearLabel,
    value: annualRevenue,
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Receita Anual
        </Typography>
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
