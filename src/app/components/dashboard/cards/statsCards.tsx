/**
 * Renders a simple card displaying a title and a numeric value.
 *
 * Useful for dashboard stats like total clients, revenue, etc.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Label or description for the stat
 * @param {number} props.value - Numeric value to be displayed
 * @returns {JSX.Element} A styled stat card
 */
export default function StatsCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-md text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}
