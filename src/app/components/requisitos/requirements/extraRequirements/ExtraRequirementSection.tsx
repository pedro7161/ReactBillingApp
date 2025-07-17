import RequirementList from '../requirementList/RequirementList';

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
 * Renders a section displaying a list of additional requirements.
 *
 * This component is a wrapper for the `RequirementList` component, passing through
 * the list of requirements and their completion state. It is commonly used to render
 * optional or extra requirements in a checklist format.
 *
 * @component
 * @param {Props} props
 * @param {Requirement[]} props.requirements - Array of requirement objects to display
 * @param {number[]} props.completedIds - Array of requirement IDs that have been completed
 * @param {(id: number) => void} props.onToggle - Function called when a requirement is toggled
 * @returns {JSX.Element}
 */
export default function ExtraRequirementSection({
  requirements,
  completedIds,
  onToggle,
}: Props) {
  return (
    <div>
      <RequirementList
        requirements={requirements}
        completedIds={completedIds}
        onToggle={onToggle}
      />
    </div>
  );
}
