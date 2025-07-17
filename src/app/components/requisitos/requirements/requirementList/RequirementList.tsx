import RequirementItem from '../requirementItem/RequirementItem';

type Requirement = {
  id: number;
  title: string;
  mandatory: boolean;
};

type Props = {
  requirements: Requirement[];
  completedIds: number[];
  onToggle: (id: number) => void;
};

/**
 * Renders a list of requirements with their completion states.
 *
 * This component maps over the provided requirements and displays each one using
 * the RequirementItem component. It marks items as completed if their ID is
 * included in the completedIds array. Clicking an item toggles its completion state
 * via the onToggle callback.
 *
 * @component
 * @param {Props} props
 * @param {Requirement[]} props.requirements - Array of requirement objects to display
 * @param {number[]} props.completedIds - Array of requirement IDs that are completed
 * @param {(id: number) => void} props.onToggle - Callback to toggle completion of a requirement by its ID
 * @returns {JSX.Element}
 */
export default function RequirementList({ requirements, completedIds, onToggle }: Props) {
  return (
    <ul className="space-y-2">
      {requirements.map((req) => (
        <RequirementItem
          key={req.id}
          title={req.title}
          completed={completedIds.includes(req.id)}
          onToggle={() => onToggle(req.id)}
        />
      ))}
    </ul>
  );
}
