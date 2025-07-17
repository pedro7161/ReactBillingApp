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

/**
 * Represents a single annual revenue data point.
 */
type AnnualDataItem = {
  /** Revenue value for the year */
  annualRevenue: number;
  /** Year label (e.g., "2022", "2023") */
  yearLabel: string;
};

/**
 * Props for the AnnualRevenueChart component.
 */
type Props = {
  /** Array of annual revenue data points */
  data: AnnualDataItem[];
};

/**
 * Renders a responsive line chart displaying annual revenue over time.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {AnnualDataItem[]} props.data - Array of revenue data with year labels.
 * @returns {JSX.Element} The rendered chart inside a Material UI card.
 */
export default function AnnualRevenueChart({ data }: Props) {
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
        <div data-testid="annual-chart-container">
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
        </div>
      </CardContent>
    </Card>
  );
}
