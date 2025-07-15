export default function StatsCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-md text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}