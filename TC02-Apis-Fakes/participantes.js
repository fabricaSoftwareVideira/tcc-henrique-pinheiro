const express = require('express');
const participantesRouter = express.Router();

const participantes = [
  {
    "id-turma": 1,
    "id-institucional": 12345,
    "id-tipo-participante": 1,
    "cpf-cnpj": "68794178500",
    "id-lotacao": 101,
    "identificador": 20210001,
    "nome": "Maria Silva",
    "turmas-agrupadas": true
  },
  {
    "id-turma": 1,
    "id-institucional": 67890,
    "id-tipo-participante": 2,
    "cpf-cnpj": "12165941040",
    "id-lotacao": 102,
    "identificador": 20210002,
    "nome": "João Souza",
    "turmas-agrupadas": false
  },
  {
    "id-turma": 2,
    "id-institucional": 54321,
    "id-tipo-participante": 1,
    "cpf-cnpj": "11656285541",
    "id-lotacao": 103,
    "identificador": 20220001,
    "nome": "Ana Pereira",
    "turmas-agrupadas": true
  },
  {
    "id-turma": 1,
    "id-institucional": 23456,
    "id-tipo-participante": 1,
    "cpf-cnpj": "02123361186",
    "id-lotacao": 104,
    "identificador": 20230001,
    "nome": "Carlos Santana",
    "turmas-agrupadas": false
  },
  {
    "id-turma": 4,
    "id-institucional": 98765,
    "id-tipo-participante": 2,
    "cpf-cnpj": "79379054769",
    "id-lotacao": 105,
    "identificador": 20230002,
    "nome": "Patrícia Almeida",
    "turmas-agrupadas": true
  },
  {
    "id-turma": 3,
    "id-institucional": 54322,
    "id-tipo-participante": 1,
    "cpf-cnpj": "99943196980",
    "id-lotacao": 112,
    "identificador": 20240007,
    "nome": "Gustavo Nunes",
    "turmas-agrupadas": true
  },
  {
    "id-turma": 1,
    "id-institucional": 65432,
    "id-tipo-participante": 1,
    "cpf-cnpj": "19080124478",
    "id-lotacao": 120,
    "identificador": 20240015,
    "nome": "Rodrigo Carvalho",
    "turmas-agrupadas": true
  },
  {
    "id-turma": 2,
    "id-institucional": 54321,
    "id-tipo-participante": 2,
    "cpf-cnpj": "62201254605",
    "id-lotacao": 121,
    "identificador": 20240016,
    "nome": "Cecília Duarte",
    "turmas-agrupadas": false
  }
  // Continuar adicionando os demais participantes até completar os 50
];

participantesRouter.get('/participantes', (req, res) => {
  const {
    'id-turma': idTurma,
    'id-institucional': idInstitucional,
    'id-tipo-participante': idTipoParticipante,
    'cpf-cnpj': cpfCnpj,
    'id-lotacao': idLotacao,
    identificador,
    nome,
    'turmas-agrupadas': turmasAgrupadas,
    limit,
    offset,
    'order-asc': orderAsc,
    'order-desc': orderDesc
  } = req.query;

  let filteredParticipantes = participantes;

  if (idTurma) {
    filteredParticipantes = filteredParticipantes.filter(p => p['id-turma'] == idTurma);
  }

  if (idInstitucional) {
    filteredParticipantes = filteredParticipantes.filter(p => p['id-institucional'] == idInstitucional);
  }

  if (idTipoParticipante) {
    filteredParticipantes = filteredParticipantes.filter(p => p['id-tipo-participante'] == idTipoParticipante);
  }

  if (cpfCnpj) {
    filteredParticipantes = filteredParticipantes.filter(p => p['cpf-cnpj'] === cpfCnpj);
  }

  if (idLotacao) {
    filteredParticipantes = filteredParticipantes.filter(p => p['id-lotacao'] == idLotacao);
  }

  if (identificador) {
    filteredParticipantes = filteredParticipantes.filter(p => p.identificador == identificador);
  }

  if (nome) {
    filteredParticipantes = filteredParticipantes.filter(p => p.nome.includes(nome));
  }

  if (turmasAgrupadas !== undefined) {
    filteredParticipantes = filteredParticipantes.filter(p => p['turmas-agrupadas'] == JSON.parse(turmasAgrupadas));
  }

  if (orderAsc) {
    filteredParticipantes = filteredParticipantes.sort((a, b) => (a[orderAsc] > b[orderAsc]) ? 1 : -1);
  } else if (orderDesc) {
    filteredParticipantes = filteredParticipantes.sort((a, b) => (a[orderDesc] < b[orderDesc]) ? 1 : -1);
  }

  const limitedParticipantes = filteredParticipantes.slice(offset || 0, (offset || 0) + (limit || filteredParticipantes.length));

  res.json(limitedParticipantes);
});

module.exports = participantesRouter;
