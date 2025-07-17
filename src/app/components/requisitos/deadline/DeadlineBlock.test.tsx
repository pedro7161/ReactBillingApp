import { render, screen } from '@testing-library/react';
import DeadlineBlock from './DeadlineBlock';

describe('DeadlineBlock', () => {
  it('renders title and formatted date', () => {
    render(<DeadlineBlock title="Test Deadline" date="2024-12-31" />);
    
    expect(screen.getByText('Test Deadline')).toBeInTheDocument();
    expect(screen.getByText(/12\/31\/2024/)).toBeInTheDocument();
  });

  it('renders with correct styling', () => {
    render(<DeadlineBlock title="Test Deadline" date="2024-12-31" />);
    
    const container = screen.getByText('Test Deadline').closest('div');
    expect(container).toHaveClass('bg-white', 'p-4', 'shadow-md', 'rounded-md');
  });

  it('renders date in red color', () => {
    render(<DeadlineBlock title="Test Deadline" date="2024-12-31" />);
    
    const dateElement = screen.getByText(/12\/31\/2024/);
    expect(dateElement).toHaveClass('text-red-600');
  });
});
