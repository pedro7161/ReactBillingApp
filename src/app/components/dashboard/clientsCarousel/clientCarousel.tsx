'use client';

import { useEffect, useState } from 'react';
import clientsData from '@/data/clients.json';
import { v4 as uuidv4 } from 'uuid';

const MAX_VISIBLE = 3;
const INTERVAL_MS = 5000;

type Client = {
  id: number;
  name: string;
  plan: string;
  value: number;
  _key?: string;
};

export default function ClientsCarousel() {
  const [visibleClients, setVisibleClients] = useState<Client[]>([]);

  useEffect(() => {
    const shuffled = [...clientsData].sort(() => 0.5 - Math.random());
    setVisibleClients(
      shuffled.slice(0, MAX_VISIBLE).map((client) => ({
        ...client,
        _key: uuidv4(),
      }))
    );

    const interval = setInterval(() => {
      const randomClient = {
        ...clientsData[Math.floor(Math.random() * clientsData.length)],
        _key: uuidv4(),
      };

      setVisibleClients((prev) => {
        const updated = [randomClient, ...prev];
        return updated.slice(0, MAX_VISIBLE);
      });
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 transition-all duration-700 ease-in-out">
      {visibleClients.map((client) => (
        <div
          key={client._key}
          className="bg-white shadow-md p-4 rounded-md transition-opacity duration-700 ease-in-out opacity-100"
        >
          <h3 className="font-semibold">{client.name}</h3>
          <p className="text-gray-500">Plano: {client.plan}</p>
          <p className="text-green-600 font-bold">€{client.value}</p>
        </div>
      ))}
    </div>
  );
}
