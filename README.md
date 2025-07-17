This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

To run tests in watch mode:

```bash
npx jest --watch
```

This will:
- Run all tests initially
- Watch for file changes
- Re-run tests related to changed files
- Show an interactive menu for test filtering

Press 'w' to show more options:
- Press 'a' to run all tests
- Press 'f' to run only failed tests
- Press 'p' to filter by a filename regex pattern
- Press 't' to filter by a test name regex pattern

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📝 Requisitos Funcionais

### Dashboard de Faturação

- Exibir dados como:
  - Receita Mensal e Anual (gráficos)
  - Número de faturas emitidas
  - Clientes ativos no mês
- Os dados devem ser apresentados em gráficos interativos

### Página de Requisitos da Empresa

- Listar requisitos de compliance, como:
  - Relatórios obrigatórios (ex: impostos, auditorias)
  - Documentação necessária para o processamento de faturas
  - Deadlines importantes
- Funcionalidade de "Check" para marcar os requisitos já cumpridos

### Simulação de Fatura

- Formulário simples onde o utilizador pode:
  - Inserir dados de um cliente fictício
  - Gerar uma "pré-visualização" de uma fatura (frontend apenas)

### Componentização e Responsividade

- Site totalmente responsivo e otimizado para desktop, tablet e mobile
- Abordagem modular para os componentes React

---

## ⚙️ Requisitos Técnicos

- Utilizar Next.js com:
  - Hooks e Context API para o estado global
- Consumo de dados Mockup:
  - Criar um ficheiro JSON ou usar uma API mock para os dados
- UI/UX apelativa:
  - Pode usar bibliotecas de design como Material-UI, Ant Design ou TailwindCSS
- Código bem documentado e limpo:
  - Nomeação clara de componentes e funções
  - Estrutura organizada dos ficheiros