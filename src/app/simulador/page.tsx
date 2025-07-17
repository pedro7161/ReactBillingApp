'use client';

import { useState } from 'react';

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type LineItem = {
  description: string;
  quantity: number;
  price: number;
};

export default function SimuladorPage() {
  const [clientData, setClientData] = useState({
    name: '',
    nif: '',
    address: '',
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: '', quantity: 1, price: 0 },
  ]);

  const [showInvoice, setShowInvoice] = useState(false);

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index: number, field: keyof LineItem, value: string | number) => {
    const updatedItems = [...lineItems];
    const item = { ...updatedItems[index] };
    
    if (field === 'description') {
      item.description = value as string;
    } else if (field === 'quantity') {
      item.quantity = Number(value);
    } else if (field === 'price') {
      item.price = Number(value);
    }
    updatedItems[index] = item;
    setLineItems(updatedItems);
  };

  const addItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, price: 0 }]);
  };

  const clearForm = () => {
    setClientData({ name: '', nif: '', address: '' });
    setLineItems([{ description: '', quantity: 1, price: 0 }]);
    setShowInvoice(false);
  };

  const total = lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Simulador de Fatura</h1>

      <div className="grid gap-4 mb-6">
        <input
          className="border p-2 rounded"
          name="name"
          placeholder="Nome do Cliente"
          value={clientData.name}
          onChange={handleClientChange}
        />
        <input
          className="border p-2 rounded"
          name="nif"
          placeholder="NIF"
          value={clientData.nif}
          onChange={handleClientChange}
        />
        <input
          className="border p-2 rounded"
          name="address"
          placeholder="Morada"
          value={clientData.address}
          onChange={handleClientChange}
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">Itens da Fatura</h2>
      {lineItems.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-2 mb-2">
          <input
            className="border p-2 rounded"
            placeholder="Descrição"
            value={item.description}
            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Quantidade"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Preço"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
          />
        </div>
      ))}

      <button onClick={addItem} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
        Adicionar Item
      </button>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setShowInvoice(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Gerar Fatura
        </button>
        <button
          onClick={clearForm}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Limpar
        </button>
      </div>

      {showInvoice && (
        <div id="invoice-preview" className="invoice-preview-pdf border rounded p-6 bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4">Pré-Visualização da Fatura</h2>
          <p><strong>Cliente:</strong> {clientData.name}</p>
          <p><strong>NIF:</strong> {clientData.nif}</p>
          <p><strong>Morada:</strong> {clientData.address}</p>

          <table className="w-full mt-4 text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Descrição</th>
                <th className="border-b p-2">Quantidade</th>
                <th className="border-b p-2">Preço</th>
                <th className="border-b p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border-b">{item.description}</td>
                  <td className="p-2 border-b">{item.quantity}</td>
                  <td className="p-2 border-b">€{item.price.toFixed(2)}</td>
                  <td className="p-2 border-b">€{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-right font-bold p-2">Total:</td>
                <td className="p-2 font-bold">€{total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          {/* <button
            onClick={async () => {
              const element = document.getElementById("invoice-preview");
              if (element) {
            
                const prevClass = element.className;
                element.className = prevClass
                  .split(' ')
                  .filter(c => !c.startsWith('bg-'))
                  .join(' ') + ' invoice-preview-pdf';

                const canvas = await html2canvas(element);

                element.className = prevClass;

                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF();
                pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
                pdf.save("fatura.pdf");
              }
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Exportar PDF
          </button> */}
        </div>
      )}
    </div>
  );
}
