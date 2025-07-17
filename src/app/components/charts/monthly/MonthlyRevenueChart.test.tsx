import { render, screen, fireEvent } from '@testing-library/react';
import MonthlyRevenueChart from './MonthlyRevenueChart';

const mockData = [
  {
    monthlyRevenue: [100, 200, 300],
    annualRevenue: 600,
    invoicesIssued: 10,
    activeClients: 5,
    yearLabel: "2023",
  },
  {
    monthlyRevenue: [150, 250, 350],
    annualRevenue: 750,
    invoicesIssued: 12,
    activeClients: 7,
    yearLabel: "2024",
  },
];

describe('MonthlyRevenueChart', () => {
  it('renders chart with year selector', () => {
    render(
      <MonthlyRevenueChart 
        data={mockData}
        selectedYearIndex={0}
        onYearChange={() => {}}
      />
    );
    
    expect(screen.getByText('Receita Mensal - 2023')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('allows year selection', () => {
    const onYearChange = jest.fn();
    render(
      <MonthlyRevenueChart 
        data={mockData}
        selectedYearIndex={0}
        onYearChange={onYearChange}
      />
    );
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    expect(onYearChange).toHaveBeenCalledWith(1);
  });
});
