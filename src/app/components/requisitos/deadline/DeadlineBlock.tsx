type Props = {
  title: string;
  date: string;
};

/**
 * Displays a deadline block with a title and a date.
 *
 * The component renders a styled card showing the provided title
 * and the formatted date in red text. The date is formatted using
 * the 'en-US' locale (MM/DD/YYYY).
 *
 * @component
 * @param {Props} props
 * @param {string} props.title - The title to display (e.g., "Submission Deadline")
 * @param {string} props.date - The date string in ISO format (e.g., "2024-12-31")
 * @returns {JSX.Element}
 */
export default function DeadlineBlock({ title, date }: Props) {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <p className="font-semibold">{title}</p>
      <p className="text-red-600">{new Date(date).toLocaleDateString('en-US')}</p>
    </div>
  );
}
