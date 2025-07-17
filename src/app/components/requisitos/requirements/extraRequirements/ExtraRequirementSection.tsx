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

export default function ExtraRequirementSection({ requirements, completedIds, onToggle }: Props) {
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
