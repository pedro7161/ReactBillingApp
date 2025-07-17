import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './page';

jest.mock('@/context/BillingContext', () => ({
  useBilling: () => ({
    billingData: [
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
    ],
  }),
}));

jest.mock('@/app/components/charts/MonthlyRevenueChart', () => () => <div>MonthlyRevenueChart</div>);
jest.mock('@/app/components/charts/AnnualRevenueChart', () => () => <div>AnnualRevenueChart</div>);
jest.mock('@/app/components/dashboard/cards/statsCards', () => ({ title, value }: any) => <div>{title}: {value}</div>);
jest.mock('@/app/components/dashboard/clientsCarousel/clientCarousel', () => () => <div>ClientsCarousel</div>);

describe('Dashboard', () => {
  it('renders dashboard stats and charts', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Faturas Emitidas \(Ano Atual\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Clientes Ativos \(Ano Atual\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Lista de Clientes/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard de Faturação/i)).toBeInTheDocument();
    expect(screen.getByText('MonthlyRevenueChart')).toBeInTheDocument();
    expect(screen.getByText('AnnualRevenueChart')).toBeInTheDocument();
    expect(screen.getByText('ClientsCarousel')).toBeInTheDocument();
  });

  it('renders stats for the selected year', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Faturas Emitidas \(2024\)/)).toBeInTheDocument();
    expect(screen.getByText(/Clientes Ativos \(2024\)/)).toBeInTheDocument();
  });
});
