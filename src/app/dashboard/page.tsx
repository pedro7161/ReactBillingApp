'use client';

import { useBilling } from '@/context/BillingContext';
import clientsData from '@/data/clients.json';
import MonthlyRevenueChart from '@/app/components/charts/MonthlyRevenueChart';


export default function Dashboard() {
  const { billingData } = useBilling();

  const { monthlyRevenue, annualRevenue, invoicesCount, activeClients } = billingData;

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
          <MonthlyRevenueChart data={monthlyRevenue} />
          {/* <AnnualRevenueChart data={annualRevenue} /> */}
        </div>

        {/* <div className="flex gap-8">
          <StatsCard title="Faturas Emitidas" value={invoicesCount} />
          <StatsCard title="Clientes Ativos" value={activeClients} />
        </div> */}
      </div>
    </div>
  );
}
