type Props = {
  title: string;
  completed: boolean;
  onToggle: () => void;
};

/**
 * Displays an individual requirement item with a checkbox to toggle its completion state.
 *
 * This component renders a styled list item representing a single requirement.
 * If the item is marked as completed, its text appears with a line-through style.
 *
 * @component
 * @param {Props} props
 * @param {string} props.title - The title or description of the requirement
 * @param {boolean} props.completed - Indicates whether the requirement is completed
 * @param {() => void} props.onToggle - Callback triggered when the checkbox is toggled
 * @returns {JSX.Element}
 */
export default function RequirementItem({ title, completed, onToggle }: Props) {
  return (
    <li className="flex items-center gap-3 bg-white shadow-md p-4 rounded-md">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="w-5 h-5"
      />
      <span className={completed ? 'line-through text-gray-400' : ''}>
        {title}
      </span>
    </li>
  );
}
