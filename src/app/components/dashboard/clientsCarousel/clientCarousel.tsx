'use client';

import { useEffect, useState } from 'react';
import clientsData from '@/data/clients.json';

const MAX_VISIBLE = 3;
const INTERVAL_MS = 5000;

export default function ClientsCarousel() {
  const [visibleClients, setVisibleClients] = useState<any[]>([]);

  useEffect(() => {
    // Immediately fill the initial list with MAX_VISIBLE random clients
    const shuffled = [...clientsData].sort(() => 0.5 - Math.random());
    setVisibleClients(shuffled.slice(0, MAX_VISIBLE));

    // Then start interval to push new clients
    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * clientsData.length);
      const nextClient = clientsData[nextIndex];

      setVisibleClients((prev) => {
        const updated = [nextClient, ...prev];
        return updated.slice(0, MAX_VISIBLE);
      });
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 transition-all duration-700 ease-in-out">
      {visibleClients.map((client) => (
        <div
          key={`${client.id}-${client.name}`}
          className="bg-white shadow-md p-4 rounded-md transition-opacity duration-700 ease-in-out opacity-100"
        >
          <p className="font-semibold">{client.name}</p>
          <p className="text-gray-500">Plano: {client.plan}</p>
          <p className="text-green-600 font-bold">€{client.value}</p>
        </div>
      ))}
    </div>
  );
}
