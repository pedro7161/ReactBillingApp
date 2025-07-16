// Página de Requisitos da Empresa:
//     Listar requisitos de compliance, como:
//          Relatórios obrigatórios (e.g., impostos, auditorias).
//          Documentação necessária para o processamento de faturas.
//          Deadlines importantes.
//     Criar uma funcionalidade de "Check" para marcar os requisitos já cumpridos.

export default function RequisitosPage() {
  return <div>
    <h1>Requisitos de Compliance</h1>
    <p>Listagem de requisitos obrigatórios da empresa.</p>

    <h2>Requisitos Atuais</h2> {/* requesitos que a empresa cumpre atualmente */}
   
    <p>Esta seção lista os requisitos de compliance que a empresa deve cumprir:</p>{/* todos os requesitos que a empresa tem que cumprir */}
    {/* scomponente que renderiza uma lista de requisitos obrigatorios */}

    <h3>Requisitos Extras</h3>
  
    <section />  {/* substituir section por componente que renderiza a lista de todos requisitos que faltam mas nao sao obrigatorios */}
    
    <ul>
      <li>Relatórios obrigatórios </li> 
      {/* adicionar talvez uma lista com nomes aleatorios de relatorios obrigatorios em falta */}
     
      <li>Documentação necessária para o processamento de faturas</li>
      {/* adicionar um textarea para escrever a documentacao necessaria */}

      <li>Deadlines importantes</li>
      {/* talvez meter uns sections blocks com datas random e titulos de deadlines importantes */}

    </ul>
    <p>Clique no botão abaixo para marcar os requisitos já cumpridos:</p>
    {/* criar um componente com todos os requisitos que a empresa tem que cumprir com uma checkbox ha esquerda que pode vir ja marcado */}

   <button>Marcar como Cumprido</button> {/*  vai atualizar o state dos requisitos cumpridos e devera atualizar a pagina para mostrar os requisitos restantes. */}


  </div>;
}
