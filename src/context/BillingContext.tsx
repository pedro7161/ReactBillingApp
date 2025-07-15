
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import billingDataJSON from '@/data/billing.json';

interface BillingData {
  monthlyRevenue: number[];
  annualRevenue: number[];
  invoicesCount: number;
  activeClients: number;
}

interface BillingContextType {
  clients: any[];
  setClients: React.Dispatch<React.SetStateAction<any[]>>;
  billingData: BillingData;
  setBillingData: React.Dispatch<React.SetStateAction<BillingData>>;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<any[]>([]);
  const [billingData, setBillingData] = useState<BillingData>({
    monthlyRevenue: billingDataJSON.monthlyRevenue,
    annualRevenue: [billingDataJSON.annualRevenue],
    invoicesCount: billingDataJSON.invoicesIssued,
    activeClients: billingDataJSON.activeClients,
  });

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
