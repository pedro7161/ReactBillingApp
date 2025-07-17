import { render, screen } from '@testing-library/react';
import AnnualRevenueChart from './AnnualRevenueChart';

const mockData = [
  {
    annualRevenue: 600,
    yearLabel: "2023",
  },
  {
    annualRevenue: 750,
    yearLabel: "2024",
  },
];

describe('AnnualRevenueChart', () => {
  it('renders chart with title', () => {
    render(<AnnualRevenueChart data={mockData} />);
    expect(screen.getByText('Receita Anual')).toBeInTheDocument();
  });

  it('renders the chart container', () => {
    render(<AnnualRevenueChart data={mockData} />);
    const chartContainer = screen.getByTestId('annual-chart-container');
    expect(chartContainer).toBeInTheDocument();
  });
});
