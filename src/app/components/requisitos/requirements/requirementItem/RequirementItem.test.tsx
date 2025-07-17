import { render, screen, fireEvent } from '@testing-library/react';
import RequirementItem from './RequirementItem';

describe('RequirementItem', () => {
  it('renders with uncompleted state', () => {
    const onToggle = jest.fn();
    render(<RequirementItem title="Test Item" completed={false} onToggle={onToggle} />);
    
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByText('Test Item')).not.toHaveClass('line-through');
  });

  it('renders with completed state', () => {
    const onToggle = jest.fn();
    render(<RequirementItem title="Test Item" completed={true} onToggle={onToggle} />);
    
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByText('Test Item')).toHaveClass('line-through');
  });

  it('calls onToggle when checkbox is clicked', () => {
    const onToggle = jest.fn();
    render(<RequirementItem title="Test Item" completed={false} onToggle={onToggle} />);
    
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
