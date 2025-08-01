'use client';

import { useState } from "react";
import { useBilling } from '@/context/BillingContext';

import MonthlyRevenueChart from '@/app/components/charts/monthly/MonthlyRevenueChart';
import AnnualRevenueChart from '@/app/components/charts/annual/AnnualRevenueChart';
import StatsCard from '@/app/components/dashboard/cards/statsCards';
import ClientsCarousel from "@/app/components/dashboard/clientsCarousel/clientCarousel";

type BillingYearData = {
  monthlyRevenue: number[];
  annualRevenue: number;
  invoicesIssued: number;
  activeClients: number;
  yearLabel: string;
};

/**
 * Dashboard component displaying billing statistics, client carousel, and revenue charts.
 *
 * Fetches billing data from the BillingContext and manages the selected year for detailed charts.
 * Shows summary cards for invoices issued and active clients both for the latest year and
 * the user-selected year. Includes a clients carousel and visualizes monthly and annual revenue.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function Dashboard() {
  const { billingData } = useBilling();

  const [selectedYearIndex, setSelectedYearIndex] = useState(billingData.length - 1);

  const latestYear: BillingYearData = billingData.length > 0
    ? billingData[billingData.length - 1]
    : {
        monthlyRevenue: [],
        annualRevenue: 0,
        invoicesIssued: 0,
        activeClients: 0,
        yearLabel: "",
      };

  const selectedYear: BillingYearData = billingData[selectedYearIndex] ?? {
    monthlyRevenue: [],
    annualRevenue: 0,
    invoicesIssued: 0,
    activeClients: 0,
    yearLabel: "",
  };

  return (
    <div className="p-6">
      {/* Summary cards for the latest year */}
      <div className="flex gap-8 mb-8 justify-center">
        <StatsCard title="Faturas Emitidas (Ano Atual)" value={latestYear.invoicesIssued} />
        <StatsCard title="Clientes Ativos (Ano Atual)" value={latestYear.activeClients} />
      </div>

      {/* Clients list carousel */}
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      <ClientsCarousel />

      <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold">Dashboard de Faturação</h1>

        {/* Summary cards for the selected year */}
        <div className="flex gap-8 mb-8">
          <StatsCard title={`Faturas Emitidas (${selectedYear.yearLabel})`} value={selectedYear.invoicesIssued} />
          <StatsCard title={`Clientes Ativos (${selectedYear.yearLabel})`} value={selectedYear.activeClients} />
        </div>

        {/* Revenue charts for the selected and annual data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MonthlyRevenueChart
            data={billingData}
            selectedYearIndex={selectedYearIndex}
            onYearChange={setSelectedYearIndex}
          />
          <AnnualRevenueChart data={billingData} />
        </div>
      </div>
    </div>
  );
}
