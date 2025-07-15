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

type Props = {
  data: number[];
};

const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function MonthlyRevenueChart({ data }: Props) {
  const chartData = data.map((value, index) => ({
    name: monthLabels[index],
    value,
  }));
  console.log("Monthly revenue data:", data);


  return (
    
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Receita Mensal
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
