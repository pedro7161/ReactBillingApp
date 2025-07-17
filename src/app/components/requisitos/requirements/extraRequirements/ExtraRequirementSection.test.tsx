import { render, screen } from '@testing-library/react';
import ExtraRequirementSection from './ExtraRequirementSection';

// Mock the RequirementList component
jest.mock('../requirementList/RequirementList', () => {
  return function MockRequirementList({ requirements, completedIds, onToggle }: any) {
    return (
      <div data-testid="mock-requirement-list">
        <span>Requirements: {requirements.length}</span>
        <span>Completed: {completedIds.length}</span>
        <button onClick={() => onToggle(1)}>Toggle</button>
      </div>
    );
  };
});

const mockRequirements = [
  { id: 1, title: 'Extra Req 1', mandatory: false },
  { id: 2, title: 'Extra Req 2', mandatory: false }
];

describe('ExtraRequirementSection', () => {
  it('renders RequirementList with correct props', () => {
    const mockOnToggle = jest.fn();
    render(
      <ExtraRequirementSection
        requirements={mockRequirements}
        completedIds={[1]}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByTestId('mock-requirement-list')).toBeInTheDocument();
    expect(screen.getByText('Requirements: 2')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
  });

  it('passes through toggle handler', () => {
    const mockOnToggle = jest.fn();
    render(
      <ExtraRequirementSection
        requirements={mockRequirements}
        completedIds={[]}
        onToggle={mockOnToggle}
      />
    );

    screen.getByText('Toggle').click();
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });
});
