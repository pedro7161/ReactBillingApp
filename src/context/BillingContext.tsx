// src/context/BillingContext.tsx
'use client';
import { createContext, useContext, useState } from 'react';

const BillingContext = createContext<any>(null);

export const BillingProvider = ({ children }: { children: React.ReactNode }) => {
  const [clients, setClients] = useState([]);

  return (
    <BillingContext.Provider value={{ clients, setClients }}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => useContext(BillingContext);
