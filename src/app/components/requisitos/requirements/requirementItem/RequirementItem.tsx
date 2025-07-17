type Props = {
  title: string;
  completed: boolean;
  onToggle: () => void;
};

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
