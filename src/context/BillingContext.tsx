
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import billingDataJSON from '@/data/billing.json';

type YearlyBillingData = {
  monthlyRevenue: number[];
  annualRevenue: number;
  invoicesIssued: number;
  activeClients: number;
  yearLabel: string;
};

interface BillingContextType {
  clients: any[];
  setClients: React.Dispatch<React.SetStateAction<any[]>>;
  billingData: YearlyBillingData[];
  setBillingData: React.Dispatch<React.SetStateAction<YearlyBillingData[]>>;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<any[]>([]);
  const [billingData, setBillingData] = useState<YearlyBillingData[]>(billingDataJSON);

  return (
    <BillingContext.Provider value={{ clients, setClients, billingData, setBillingData }}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = (): BillingContextType => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
};
