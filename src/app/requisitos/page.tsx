"use client";

import { useState } from "react";

import RequirementList from "@/app/components/requisitos/requirements/requirementList/RequirementList";
import ExtraRequirementSection from "@/app/components/requisitos/requirements/extraRequirements/ExtraRequirementSection";
import DeadlineBlock from "@/app/components/requisitos/deadline/DeadlineBlock";

import requirementDataJSON from "@/data/requirements.json";
import deadlines from '@/data/deadlines.json';

const allRequirements = requirementDataJSON;

/**
 * RequisitosPage component
 *
 * Displays a compliance requirements checklist separated into mandatory and optional items,
 * allows toggling completion of requirements,
 * shows a notification when requirements are updated,
 * includes a documentation input textarea,
 * and renders important deadline blocks.
 *
 * This is a client component using React state hooks to manage the completed requirements.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function RequisitosPage() {
  const [completedIds, setCompletedIds] = useState<number[]>(
    allRequirements.filter((r) => r.checked).map((r) => r.id)
  );

  /**
   * Toggles completion status of a requirement by ID.
   * If ID is in completedIds, remove it; otherwise, add it.
   * @param {number} id - Requirement ID to toggle
   */
  const toggleCompleted = (id: number) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const [showUpdateMsg, setShowUpdateMsg] = useState(false);

  const mandatory = allRequirements.filter((r) => r.mandatory);
  const optional = allRequirements.filter((r) => !r.mandatory);

  /**
   * Handler for the "Atualizar Requisitos Marcados" button click.
   * Shows a temporary success message and scrolls the page to the top.
   */
  const handleUpdateClick = () => {
    setShowUpdateMsg(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setShowUpdateMsg(false), 10000);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Update notification message */}
      {showUpdateMsg && (
        <div className="w-full bg-green-100 border border-green-400 text-green-900 px-4 py-3 rounded mb-4 flex font-medium">
          Os requisitos marcados foram atualizados (mock)
        </div>
      )}

      <h1 className="text-3xl font-bold">Requisitos de Compliance</h1>
      <p className="text-gray-600">
        Listagem de requisitos obrigatórios e extras que a empresa deve cumprir.
      </p>

      {/* Mandatory requirements section */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Requisitos Atuais</h2>
        <RequirementList
          requirements={mandatory}
          completedIds={completedIds}
          onToggle={toggleCompleted}
        />
      </section>

      {/* Optional requirements section */}
      <section>
        <h3 className="text-xl font-semibold mt-8 mb-2">Requisitos Extras</h3>
        <ExtraRequirementSection
          requirements={optional}
          completedIds={completedIds}
          onToggle={toggleCompleted}
        />
      </section>

      {/* Documentation input */}
      <section>
        <h3 className="text-xl font-semibold mt-8 mb-2">
          Documentação Necessária
        </h3>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Ex: NIF, Recibo, IBAN..."
        />
      </section>

      {/* Deadlines section */}
      <section>
        <h3 className="text-xl font-semibold mt-8 mb-2">Deadlines Importantes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deadlines.map((deadline) => (
            <DeadlineBlock
              key={deadline.id}
              title={deadline.title}
              date={deadline.date}
            />
          ))}
        </div>
      </section>

      {/* Update button */}
      <div className="flex flex-col items-center mt-8">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          onClick={handleUpdateClick}
        >
          Atualizar Requisitos Marcados
        </button>
      </div>
    </div>
  );
}
