# Sistema de controle de almoços

### Telas
- login
- recuperação de senha

### Login Pessoa
   - Tela Status - Solicitação Diária  
   - Relatório mensal para aprovação.
   - Histórico dos relatórios aprovados.
   - Informações do restaurante
      - Cardápio 

### Login Restaurante
   - Lista Diária
   - Relatório Mensal
   - Anexar de catálogo de almoço mensal/semana

### Login Contabilidade
   - Relatório individual por pessoa e empresa da organização.

### Login Financeiro (Genrenciamento da Organização (Podendo conter mais de um CNPJ))
- Tela Restaurantes
   -  Cadastro: nome, imagem
   -  tipos de marmitas/bifes e preços.
   -  Lista diária por empresas (CNPJ).

- Tela Empresas:
   - Cadastro: Nome / email / código matrícula / CPF / Telefone
   - Tela de cadastro de dias uteis / não uteis.
   - Tela de controle de usuários da empresa:
   - Cadastro de usuáro e recuperação de senha.

- Tela Financeiro.
   - Relatórios:
      - Diário
      - Mensal
      - Finalização de mês:
         - Consulta / alteração manual
         - Confirmação de relatório para a pessoa.
         - Aprovação para a contabilidade.
      - Extrair dados.

### Login Administrador coisa nossa
- Root
   - Tela de cadatro de organização: Nome / Logomarca
   - Tela de permissões e login root nas organizações
   - Tela de logs:
      - Registro de acessos / alterações.
   - Relatório geral de uso

### Dificuldades:
### Gerenciamento do usuários com permissoes diferentes.
### Telas de relatório são bem complexas de fazer.
### Fechameento das folhas.

#### No banco de dados
```js
* const system = {
   portal: {
      act:true,
      version: 1,
      rootEmail: "admin@admin.com"
   }
}
```