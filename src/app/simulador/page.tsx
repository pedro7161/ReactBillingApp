'use client';

import { useState } from 'react';

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type LineItem = {
  description: string;
  quantity: number;
  price: number;
};

/**
 * SimuladorPage component
 *
 * A simple invoice simulator that allows users to input client data and multiple line items,
 * preview the invoice, and export it as a PDF.
 *
 * Features:
 * - Client information input (name, NIF, address)
 * - Dynamic line items with description, quantity, and price fields
 * - Calculates total invoice amount
 * - Preview invoice in the UI
 * - Export the invoice preview to PDF using html2canvas and jsPDF
 *
 * @component
 * @returns {JSX.Element} The invoice simulator page
 */
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

  /**
   * Handles changes in client input fields
   * Updates clientData state with the new value for the given input name
   *
   * @param e - The input change event
   */
  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  /**
   * Handles changes to a specific field in a line item at a given index
   * Updates the lineItems state accordingly
   *
   * @param index - Index of the line item to update
   * @param field - Field of the line item to update ('description' | 'quantity' | 'price')
   * @param value - New value for the field
   */
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

  /**
   * Adds a new empty line item to the invoice
   */
  const addItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, price: 0 }]);
  };

  /**
   * Clears the client data and resets the line items to a single empty item
   * Also hides the invoice preview
   */
  const clearForm = () => {
    setClientData({ name: '', nif: '', address: '' });
    setLineItems([{ description: '', quantity: 1, price: 0 }]);
    setShowInvoice(false);
  };
  
  const total = lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  /**
   * Exports the invoice preview to a PDF file.
   * It uses html2canvas to take a snapshot of the invoice preview and then jsPDF to generate the PDF.
   * The background classes from Tailwind are temporarily removed to avoid styling issues in the PDF.
   */
  const exportToPDF = async () => {
    const element = document.getElementById("invoice-preview");
    if (element) {      
      const prevClasses = element.className;      
      const filteredClasses = prevClasses
        .split(" ")
        .filter((c) => !c.startsWith("bg-"))
        .join(" ");
      element.className = filteredClasses;
      
      const canvas = await html2canvas(element, { scale: 2 });
      
      element.className = prevClasses;
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
    const pdfWidth = 190; 
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save("fatura.pdf");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Simulador de Fatura</h1>

      {/* Client Data Input Fields */}
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

      {/* Line Items Section */}
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

      {/* Button to add more line items */}
      <button onClick={addItem} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Adicionar Item
      </button>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setShowInvoice(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Gerar Fatura
        </button>
        <button
          onClick={clearForm}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
        >
          Limpar
        </button>
      </div>

      {/* Invoice Preview Section */}
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

          {/* Export PDF button */}
          <button
            onClick={exportToPDF}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Exportar PDF
          </button>
        </div>
      )}
    </div>
  );
}
