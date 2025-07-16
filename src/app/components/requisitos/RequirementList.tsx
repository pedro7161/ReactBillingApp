import RequirementItem from './RequirementItem';

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
