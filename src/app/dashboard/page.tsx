import clientsData from '@/data/clients.json';

export default function Dashboard() {
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
    </div>
  );
}
