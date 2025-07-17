import { render, screen, act } from '@testing-library/react';
import ClientsCarousel from './clientCarousel';

jest.mock('@/data/clients.json', () => [
  { id: 1, name: 'Client 1', plan: 'Basic', value: 100 },
  { id: 2, name: 'Client 2', plan: 'Premium', value: 200 },
  { id: 3, name: 'Client 3', plan: 'Pro', value: 300 },
]);

jest.useFakeTimers();

describe('ClientsCarousel', () => {
  it('renders initial clients', () => {
    render(<ClientsCarousel />);
    expect(screen.getAllByRole('heading').length).toBeLessThanOrEqual(3);
  });

  it('updates clients after interval', () => {
    render(<ClientsCarousel />);
    const initialClients = screen.getAllByRole('heading').map(h => h.textContent);
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const updatedClients = screen.getAllByRole('heading').map(h => h.textContent);
    expect(updatedClients).not.toEqual(initialClients);
  });

  it('maintains maximum visible clients', () => {
    render(<ClientsCarousel />);
    act(() => {
      jest.advanceTimersByTime(15000);
    });
    
    expect(screen.getAllByRole('heading').length).toBeLessThanOrEqual(3);
  });
});
