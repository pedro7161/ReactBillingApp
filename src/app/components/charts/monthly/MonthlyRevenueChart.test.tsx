import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('allows year selection using keyboard', async () => {
    const onYearChange = jest.fn();
    render(
      <MonthlyRevenueChart 
        data={mockData}
        selectedYearIndex={0}
        onYearChange={onYearChange}
      />
    );

    const comboBox = screen.getByRole('combobox');

    await userEvent.click(comboBox);
    const option = await screen.findByText('2024');
    await userEvent.click(option);

   
    expect(onYearChange).toHaveBeenCalledWith(1);
  });
});
