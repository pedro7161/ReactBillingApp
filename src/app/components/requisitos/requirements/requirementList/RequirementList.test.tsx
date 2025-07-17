import { render, screen, fireEvent } from '@testing-library/react';
import RequirementList from './RequirementList';

const mockRequirements = [
  { id: 1, title: 'Requirement 1', mandatory: true },
  { id: 2, title: 'Requirement 2', mandatory: false }
];

describe('RequirementList', () => {
  it('renders all requirements', () => {
    const onToggle = jest.fn();
    render(
      <RequirementList
        requirements={mockRequirements}
        completedIds={[]}
        onToggle={onToggle}
      />
    );

    expect(screen.getByText('Requirement 1')).toBeInTheDocument();
    expect(screen.getByText('Requirement 2')).toBeInTheDocument();
  });

  it('shows correct completion state', () => {
    const onToggle = jest.fn();
    render(
      <RequirementList
        requirements={mockRequirements}
        completedIds={[1]}
        onToggle={onToggle}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('calls onToggle with correct id', () => {
    const onToggle = jest.fn();
    render(
      <RequirementList
        requirements={mockRequirements}
        completedIds={[]}
        onToggle={onToggle}
      />
    );

    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(onToggle).toHaveBeenCalledWith(1);
  });
});
