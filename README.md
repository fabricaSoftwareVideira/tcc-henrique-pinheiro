# Sistema de Gerenciamento de Frequência em Eventos do IFC Videira

Este repositório centraliza o protótipo de um sistema completo para gerenciamento e registro de frequência em eventos da instituição IFC Videira. O sistema é composto por uma API, um front-end administrativo e uma aplicação para os alunos.

---

## Componentes do Sistema

### 1. API de Gerenciamento de Frequência
#### Funcionalidades Principais:
- Gerenciamento de eventos, usuários e presenças.
- Emissão de relatórios em PDF.
- Integração com autenticação Gov.br.

#### Documentação das Rotas da API:

### 1. `/createUser`
- **Método:** `POST`
- **Descrição:** Cria um novo usuário.
- **Parâmetros:**
  - Corpo da Requisição (JSON):
    - `userName` (string): Nome do usuário.
    - `userEmail` (string): Email do usuário.
    - `userPassword` (string): Senha do usuário.
    - `roleId` (integer): ID do cargo do usuário.
    - `roleTitle` (string): Título do cargo do usuário.
- **Retorno:**
  - `201`: Usuário criado com sucesso.
  - `400`: Requisição inválida (dados incorretos ou senha inválida).
  - `409`: Email já registrado.
  - `500`: Erro interno do servidor.

### 2. `/fetchAllUsers`
- **Método:** `GET`
- **Descrição:** Retorna todos os usuários com suporte à paginação e pesquisa.
- **Parâmetros:**
  - Query Parameters:
    - `skip` (integer): Número de itens a pular para paginação.
    - `take` (integer): Número de itens a retornar para paginação.
    - `searchTerm` (string): Termo de busca para filtrar os usuários pelo nome ou email.
- **Retorno:**
  - `200`: Lista de usuários retornada com sucesso.
  - `404`: Nenhum usuário encontrado.
  - `500`: Erro interno do servidor.

### 3. `/loginUser`
- **Método:** `POST`
- **Descrição:** Realiza o login do usuário.
- **Parâmetros:**
  - Corpo da Requisição (JSON):
    - `userEmail` (string): Email do usuário.
    - `userPassword` (string): Senha do usuário.
- **Retorno:**
  - `201`: Login realizado com sucesso.
  - `400`: Requisição inválida (dados ou senha incorretos).
  - `401`: Credenciais inválidas (email ou senha incorretos).
  - `500`: Erro interno do servidor.

### 4. `/fetchAllCourses`
- **Método:** `GET`
- **Descrição:** Retorna todos os cursos.
- **Parâmetros:** Nenhum.
- **Retorno:**
  - `201`: Cursos retornados com sucesso.

### 5. `/createEvent`
- **Método:** `POST`
- **Descrição:** Cria um novo evento.
- **Parâmetros:**
  - Corpo da Requisição (JSON):
    - Objeto do tipo `Event`, contendo os detalhes do evento.
- **Retorno:**
  - `201`: Evento criado com sucesso.
  - `400`: Requisição inválida.
  - `500`: Erro interno do servidor.

### 6. `/fetchAllEventStatusOptions`
- **Método:** `GET`
- **Descrição:** Retorna todas as opções de status de eventos.
- **Parâmetros:** Nenhum.
- **Retorno:**
  - `200`: Opções de status de eventos retornadas com sucesso.

### 7. `/fetchAllEvents`
- **Método:** `GET`
- **Descrição:** Retorna todos os eventos.
- **Parâmetros:**
  - Query Parameters:
    - `searchTerm` (string): Termo de busca para filtrar eventos.
    - `skip` (integer): Número de itens a pular para paginação.
    - `take` (integer): Número de itens a retornar para paginação.
- **Retorno:**
  - `200`: Eventos retornados com sucesso.
  - `404`: Nenhum evento encontrado.
  - `500`: Erro interno do servidor.

### 8. `/getEventById/{eventId}`
- **Método:** `GET`
- **Descrição:** Retorna um evento pelo ID.
- **Parâmetros:**
  - Path Parameter:
    - `eventId` (string): O ID do evento.
- **Retorno:**
  - `200`: Evento retornado com sucesso.
  - `404`: Evento não encontrado.

### 9. `/editEvent/{eventId}`
- **Método:** `PUT`
- **Descrição:** Edita um evento pelo ID.
- **Parâmetros:**
  - Path Parameter:
    - `eventId` (string): O ID do evento.
  - Corpo da Requisição (JSON):
    - Objeto do tipo `Event`, contendo os detalhes do evento a ser editado.
- **Retorno:**
  - `200`: Evento editado com sucesso.
  - `400`: Requisição inválida.
  - `404`: Evento não encontrado.

### 10. `/fetchAllRoles`
- **Método:** `GET`
- **Descrição:** Retorna todos os cargos.
- **Parâmetros:** Nenhum.
- **Retorno:**
  - `200`: Lista de cargos.
  - `404`: Nenhum cargo encontrado.

### 11. `/createAttendance`
- **Método:** `POST`
- **Descrição:** Registra uma presença para um aluno em uma atividade de evento.
- **Parâmetros:**
  - Corpo da Requisição (JSON):
    - `studentCpf` (string): CPF do estudante (11 dígitos).
    - `eventActivityId` (integer): ID da atividade do evento.
    - `eventId` (integer): ID do evento.
    - `latitude` (number): Latitude da localização do estudante.
    - `longitude` (number): Longitude da localização do estudante.
- **Retorno:**
  - `201`: Presença registrada com sucesso.
  - `400`: Requisição inválida (dados incorretos ou validações falharam).
  - `404`: Estudante, evento ou atividade não encontrado.
  - `500`: Erro interno do servidor.

### 12. `/issueReport`
- **Método:** `POST`
- **Descrição:** Gera um relatório de presença de um evento.
- **Parâmetros:**
  - Corpo da Requisição (JSON):
    - Objeto do tipo `IssueReport`, contendo os detalhes do evento a ser reportado.
- **Retorno:**
  - `200`: Relatório gerado com sucesso.
  - `400`: Requisição inválida (dados incorretos ou validações falharam).
  - `404`: Evento ou usuário não encontrado.
  - `500`: Erro interno do servidor.

### 13. `/fetchEvents`
- **Método:** `GET`
- **Descrição:** Retorna todos os eventos disponíveis para os alunos.
- **Parâmetros:** Nenhum.
- **Retorno:**
  - `200`: Lista de eventos retornada com sucesso.
  - `404`: Nenhum evento encontrado.
  - `500`: Erro interno do servidor.

### 14. `/getEventByIdStudent/{eventId}`
- **Método:** `GET`
- **Descrição:** Retorna um evento específico pelo ID para um aluno.
- **Parâmetros:**
  - Path Parameter:
    - `eventId` (integer): O ID do evento.
- **Retorno:**
  - `200`: Evento retornado com sucesso.
  - `404`: Evento não encontrado.
  - `500`: Erro interno do servidor.

### 15. `/auth/login`
- **Método:** `GET`
- **Descrição:** Redireciona o aluno para a URL de login.
- **Parâmetros:** Nenhum.
- **Retorno:**
  - `302`: Redirecionamento para a URL de login do estudante.
  - `500`: Erro ao gerar URL de login.

### 16. `/auth/exchange`
- **Método:** `POST`
- **Descrição:** Troca o código do gov.br por um token de acesso.
- **Parâmetros:**
  - Corpo da Requisição (JSON):
    - `code` (string): Código retornado pelo gov.br.
- **Retorno:**
  - `200`: Sucesso ao autenticar.
  - `400`: Requisição inválida (dados incorretos).
  - `500`: Falha ao autenticar.

---

### 2. Front-End Administrativo
#### Funcionalidades:
- Login e autenticação para administradores.
- Cadastro e gerenciamento de eventos e usuários.
- Listagem detalhada de eventos e usuários.

#### Telas Disponíveis:
- **Login Admin**: ![Figura 1: Login Admin](/telas/loginAdmin.png)
- **Home Page**: ![Figura 2: Home Page Admin](/telas/homePageAdmin.png)
- **Lista de Eventos**: ![Figura 3: Listagem de Eventos](/telas/listaEventosAdmin.png)
- **Cadastro de Eventos**: ![Figura 4: Cadastro de Eventos](/telas/criacaoEventosAdmin.png)
- **Listagem de Usuários**: ![Figura 5: Listagem de Usuários](/telas/listagemUsuarios.png)
- **Cadastro de Usuários**: ![Figura 6: Cadastro de Usuários](/telas/FormularioCriarUsuario.png)

---

### 3. Aplicação para Alunos
#### Funcionalidades:
- Login utilizando autenticação Gov.br.
- Listagem de eventos disponíveis.
- Registro de presenças em eventos.

#### Telas Disponíveis:
- **Login Aluno**: ![Figura 1: Login Aluno](/telas/loginAluno.png)
- **Listagem de Eventos**: ![Figura 2: Listagem de Eventos Aluno](/telas/listaEventosAluno.png)
- **Listagem de Atividades**: ![Figura 3: Lista de Atividades](/telas/listaAtividadesAluno.png)

---

## Diagramas Disponíveis

### 1. Arquitetura do Sistema
![Figura 1: Arquitetura](/diagramas/ArquiteturaTC01.png)
Este diagrama representa a arquitetura geral do sistema, mostrando como os componentes se conectam e interagem entre si.

### 2. Diagrama de Sequência (Autenticação Gov.br)
![Figura 2: Diagrama de Sequência Autenticação Gov.br](/diagramas/diagrama_sequencia2.png)
Este diagrama ilustra o fluxo de comunicação entre os atores e componentes do sistema para autenticação.

### 3. Modelo do Banco de Dados
![Figura 3: Modelo do Banco de Dados](/diagramas/modeloBancoTC_SVG.png)
Representação do modelo de dados do sistema, incluindo tabelas e relações.

---

## Emissão de Relatórios

#### Passos para geração de relatórios:
1. Usuário solicita emissão com `eventId` e `userEmail`.
2. Sistema busca atividades do evento e turmas associadas ao ano.
3. Analisa cronograma das turmas e recupera estudantes matriculados.
4. Gera relatório em PDF e envia ao email do usuário e professores.

---

Este sistema foi desenvolvido como um protótipo para facilitar a gestão de eventos e frequência no IFC Videira.
