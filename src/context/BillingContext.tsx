// src/context/BillingContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

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

const defaultBillingData: BillingData = {
  monthlyRevenue: [],
  annualRevenue: [],
  invoicesCount: 0,
  activeClients: 0,
};

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<any[]>([]);
  const [billingData, setBillingData] = useState<BillingData>(defaultBillingData);

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
