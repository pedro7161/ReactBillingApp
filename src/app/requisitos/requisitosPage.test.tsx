import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RequisitosPage from './page';

// ✅ Mock scrollTo to prevent jsdom crash
beforeAll(() => {
    window.scrollTo = jest.fn();
});

// Mock requirements and deadlines data
jest.mock('@/data/requirements.json', () => ([
    { id: 1, label: 'Req 1', mandatory: true, checked: false },
    { id: 2, label: 'Req 2', mandatory: false, checked: false },
]));
jest.mock('@/data/deadlines.json', () => ([
    { id: 1, title: 'Deadline 1', date: '2024-12-31' },
]));

// Mock child components
jest.mock('@/app/components/requisitos/requirements/requirementList/RequirementList', () => ({ requirements, completedIds, onToggle }: any) => (
    <div>
        RequirementList
        {requirements.map((r: any) => (
            <div key={r.id}>
                <span>{r.label}</span>
                <button onClick={() => onToggle(r.id)}>{completedIds.includes(r.id) ? 'Uncheck' : 'Check'}</button>
            </div>
        ))}
    </div>
));
jest.mock('@/app/components/requisitos/requirements/extraRequirements/ExtraRequirementSection', () => ({ requirements, completedIds, onToggle }: any) => (
    <div>
        ExtraRequirementSection
        {requirements.map((r: any) => (
            <div key={r.id}>
                <span>{r.label}</span>
                <button onClick={() => onToggle(r.id)}>{completedIds.includes(r.id) ? 'Uncheck' : 'Check'}</button>
            </div>
        ))}
    </div>
));
jest.mock('@/app/components/requisitos/deadline/DeadlineBlock', () => ({ title, date }: any) => (
    <div>
        <span>{title}</span>
        <span>{date}</span>
    </div>
));

describe('RequisitosPage', () => {
    it('renders main sections', () => {
        render(<RequisitosPage />);
        expect(screen.getByText(/Requisitos de Compliance/i)).toBeInTheDocument();
        expect(screen.getByText(/Requisitos Atuais/i)).toBeInTheDocument();
        expect(screen.getByText(/Requisitos Extras/i)).toBeInTheDocument();
        expect(screen.getByText(/Documentação Necessária/i)).toBeInTheDocument();
        expect(screen.getByText(/Deadlines Importantes/i)).toBeInTheDocument();
        expect(screen.getByText(/Atualizar Requisitos Marcados/i)).toBeInTheDocument();
    });

    it('can toggle requirements', () => {
        render(<RequisitosPage />);
        const checkButtons = screen.getAllByText('Check');
        fireEvent.click(checkButtons[0]);
        expect(screen.getAllByText('Uncheck').length).toBe(1);
    });

    it('shows update message when clicking update',
        async () => {
            render(<RequisitosPage />);
            fireEvent.click(screen.getByText(/Atualizar Requisitos Marcados/i));
            expect(screen.getByText(/Os requisitos marcados foram atualizados/i)).toBeInTheDocument();

            await waitFor(
                () =>
                    expect(
                        screen.queryByText(/Os requisitos marcados foram atualizados/i)
                    ).not.toBeInTheDocument(),
                { timeout: 11000 }
            );
        },
        15000
    );
});
