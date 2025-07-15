'use client';

import { useBilling } from '@/context/BillingContext';
import clientsData from '@/data/clients.json';
import MonthlyRevenueChart from '@/app/components/charts/MonthlyRevenueChart';
import AnnualRevenueChart from '@/app/components/charts/AnnualRevenueChart';

export default function Dashboard() {
  const { billingData } = useBilling();

  // billingData is now an array of yearly billing objects
  // Use the latest year for summary stats (assuming the first item is the latest)
  const latestYear = billingData[0] ?? {
    monthlyRevenue: [],
    annualRevenue: 0,
    invoicesIssued: 0,
    activeClients: 0,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      <div className="grid gap-4">
        {clientsData.map((client) => (
          <div key={client.id} className="bg-white shadow-md p-4 rounded-md">
            <p className="font-semibold">{client.name}</p>
            <p className="text-gray-500">Plano: {client.plan}</p>
            <p className="text-green-600 font-bold">€{client.value}</p>
          </div>
        ))}
      </div>

      <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold">Dashboard de Faturação</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pass the entire array to MonthlyRevenueChart for year selection */}
          <MonthlyRevenueChart data={billingData} />

          {/* Pass just the latest year's annual revenue */}
          <AnnualRevenueChart data={billingData} />
        </div>

        {/* Uncomment and update if you want to show these stats */}
        {/* <div className="flex gap-8">
          <StatsCard title="Faturas Emitidas" value={latestYear.invoicesIssued} />
          <StatsCard title="Clientes Ativos" value={latestYear.activeClients} />
        </div> */}
      </div>
    </div>
  );
}
