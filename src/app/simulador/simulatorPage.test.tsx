import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SimuladorPage from './page';

test('renders Simulador de Fatura title', () => {
  render(<SimuladorPage />);
  expect(screen.getByText(/Simulador de Fatura/i)).toBeInTheDocument();
});

test('renders client input fields', () => {
  render(<SimuladorPage />);
  expect(screen.getByPlaceholderText(/Nome do Cliente/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/NIF/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Morada/i)).toBeInTheDocument();
});

test('renders initial item fields', () => {
  render(<SimuladorPage />);
  expect(screen.getByPlaceholderText(/Descrição/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Quantidade/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Preço/i)).toBeInTheDocument();
});

test('can add a new item', () => {
  render(<SimuladorPage />);
  const addButton = screen.getByText(/Adicionar Item/i);
  fireEvent.click(addButton);
  const descriptionInputs = screen.getAllByPlaceholderText(/Descrição/i);
  expect(descriptionInputs.length).toBe(2);
});

test('can fill client and item fields and generate invoice', async () => {
  render(<SimuladorPage />);
  fireEvent.change(screen.getByPlaceholderText(/Nome do Cliente/i), { target: { value: 'Pedro' } });
  fireEvent.change(screen.getByPlaceholderText(/NIF/i), { target: { value: '123456789' } });
  fireEvent.change(screen.getByPlaceholderText(/Morada/i), { target: { value: 'Rua 1' } });
  fireEvent.change(screen.getByPlaceholderText(/Descrição/i), { target: { value: 'Serviço A' } });
  fireEvent.change(screen.getByPlaceholderText(/Quantidade/i), { target: { value: '2' } });
  fireEvent.change(screen.getByPlaceholderText(/Preço/i), { target: { value: '10' } });

  fireEvent.click(screen.getByText(/Gerar Fatura/i));

  await waitFor(() => {
    expect(screen.getByText(/Pré-Visualização da Fatura/i)).toBeInTheDocument();
    expect(screen.getByText(/Pedro/)).toBeInTheDocument();
    expect(screen.getByText(/123456789/)).toBeInTheDocument();
    expect(screen.getByText(/Rua 1/)).toBeInTheDocument();
    expect(screen.getByText(/Serviço A/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('€10.00')).toBeInTheDocument();

    const totalCells = screen.getAllByText('€20.00');
    expect(totalCells.length).toBe(2);
  });
});

test('can clear the form', async () => {
  render(<SimuladorPage />);
  fireEvent.change(screen.getByPlaceholderText(/Nome do Cliente/i), { target: { value: 'Pedro' } });
  fireEvent.click(screen.getByText(/Gerar Fatura/i));
  await waitFor(() => {
    expect(screen.getByText(/Pré-Visualização da Fatura/i)).toBeInTheDocument();
  });
  fireEvent.click(screen.getByText(/Limpar/i));
  expect(screen.queryByText(/Pré-Visualização da Fatura/i)).not.toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Nome do Cliente/i)).toHaveValue('');
});