import { render, screen } from '@testing-library/react';
import StatsCard from './statsCards';

describe('StatsCard', () => {
  it('renders title and value', () => {
    render(<StatsCard title="Test Title" value={1234} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('formats large numbers correctly', () => {
    render(<StatsCard title="Big Number" value={1000000} />);
    
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
  });

  it('handles zero value', () => {
    render(<StatsCard title="Zero" value={0} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
