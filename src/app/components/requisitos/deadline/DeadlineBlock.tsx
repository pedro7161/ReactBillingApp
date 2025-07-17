type Props = {
  title: string;
  date: string;
};

export default function DeadlineBlock({ title, date }: Props) {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <p className="font-semibold">{title}</p>
      <p className="text-red-600">{new Date(date).toLocaleDateString()}</p>
    </div>
  );
}
