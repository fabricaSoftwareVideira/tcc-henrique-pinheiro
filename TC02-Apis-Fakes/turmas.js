const express = require('express');
const turmasRouter = express.Router();

const turmas = [
  {
    "ano": 2024,
    "capacidade-aluno": 40,
    "codigo-componente": "MAT101",
    "codigo-turma": "MATEMATICA_BASICA_2024",
    "descricao-horario": "1234567M12345 (27/08/2024 - 03/12/2024)",
    "id-componente": 1,
    "id-discente": 123,
    "id-docente": 456,
    "id-docente-externo": 789,
    "id-modalidade-educacao": 1,
    "id-situacao-turma": 1,
    "id-turma": 1,
    "id-turma-agrupadora": 0,
    "id-unidade": 1,
    "local": "Sala 101",
    "nome-componente": "Matemática",
    "periodo": 1,
    "sigla-nivel": "GR",
    "subturma": false,
    "tipo": 1,
    "utiliza-nova-turma-virtual": false
  },
  {
    "ano": 2024,
    "capacidade-aluno": 30,
    "codigo-componente": "HIS202",
    "codigo-turma": "HISTORIA_MUNDIAL_2024",
    "descricao-horario": "12345M12345 7M45 7T12 (29/07/2024 - 10/08/2024), 3M12345 7M45 7T1234 (13/08/2024 - 26/08/2024), 24M3 (02/10/2024 - 27/11/2024)",
    "id-componente": 2,
    "id-discente": 124,
    "id-docente": 457,
    "id-docente-externo": 790,
    "id-modalidade-educacao": 1,
    "id-situacao-turma": 2,
    "id-turma": 2,
    "id-turma-agrupadora": 0,
    "id-unidade": 2,
    "local": "Sala 102",
    "nome-componente": "História",
    "periodo": 2,
    "sigla-nivel": "GR",
    "subturma": false,
    "tipo": 1,
    "utiliza-nova-turma-virtual": true
  },
  {
    "ano": 2024,
    "capacidade-aluno": 35,
    "codigo-componente": "FIS301",
    "codigo-turma": "FISICA_APLICADA_2024",
    "descricao-horario": "2M45 5M12 (29/07/2024 - 28/11/2024)",
    "id-componente": 3,
    "id-discente": 125,
    "id-docente": 458,
    "id-docente-externo": 791,
    "id-modalidade-educacao": 1,
    "id-situacao-turma": 1,
    "id-turma": 3,
    "id-turma-agrupadora": 0,
    "id-unidade": 3,
    "local": "Sala 103",
    "nome-componente": "Física",
    "periodo": 1,
    "sigla-nivel": "GR",
    "subturma": false,
    "tipo": 1,
    "utiliza-nova-turma-virtual": false
  },
  {
    "ano": 2024,
    "capacidade-aluno": 40,
    "codigo-componente": "QUI401",
    "codigo-turma": "QUIMICA_GERAL_2024",
    "descricao-horario": "246M12 (29/07/2024 - 04/12/2024)",
    "id-componente": 4,
    "id-discente": 126,
    "id-docente": 459,
    "id-docente-externo": 792,
    "id-modalidade-educacao": 1,
    "id-situacao-turma": 1,
    "id-turma": 4,
    "id-turma-agrupadora": 0,
    "id-unidade": 1,
    "local": "Sala 104",
    "nome-componente": "Química",
    "periodo": 1,
    "sigla-nivel": "GR",
    "subturma": false,
    "tipo": 1,
    "utiliza-nova-turma-virtual": false
  },
  {
    "ano": 2024,
    "capacidade-aluno": 50,
    "codigo-componente": "BIO501",
    "codigo-turma": "BIOLOGIA_CELULAR_2024",
    "descricao-horario": "7M123 (29/07/2024 - 31/08/2024), 7M1234 (01/09/2024 - 14/12/2024)",
    "id-componente": 5,
    "id-discente": 127,
    "id-docente": 460,
    "id-docente-externo": 793,
    "id-modalidade-educacao": 1,
    "id-situacao-turma": 1,
    "id-turma": 5,
    "id-turma-agrupadora": 0,
    "id-unidade": 2,
    "local": "Sala 105",
    "nome-componente": "Biologia",
    "periodo": 2,
    "sigla-nivel": "GR",
    "subturma": false,
    "tipo": 1,
    "utiliza-nova-turma-virtual": true
  },
  {
    "ano": 2024,
    "capacidade-aluno": 20,
    "codigo-componente": "ENG601",
    "codigo-turma": "ENGENHARIA_BASICA_2024",
    "descricao-horario": "2M12345 (12/08/2024 - 25/11/2024)",
    "id-componente": 6,
    "id-discente": 128,
    "id-docente": 461,
    "id-docente-externo": 794,
    "id-modalidade-educacao": 1,
    "id-situacao-turma": 1,
    "id-turma": 6,
    "id-turma-agrupadora": 0,
    "id-unidade": 1,
    "local": "Sala 106",
    "nome-componente": "Engenharia",
    "periodo": 1,
    "sigla-nivel": "GR",
    "subturma": false,
    "tipo": 1,
    "utiliza-nova-turma-virtual": false
  },
  {
    "ano": 2024,
    "capacidade-aluno": 25,
    "codigo-componente": "FIL701",
    "codigo-turma": "FILOSOFIA_GERAL_2024",
    "descricao-horario": "3M12345 (27/08/2024 - 03/12/2024)",
    "id-componente": 7,
    "id-discente": 129,
    "id-docente": 462,
    "id-docente-externo": 795,
    "id-modalidade-educacao": 1,
    "id-situacao-turma": 1,
    "id-turma": 7,
    "id-turma-agrupadora": 0,
    "id-unidade": 2,
    "local": "Sala 107",
    "nome-componente": "Filosofia",
    "periodo": 2,
    "sigla-nivel": "GR",
    "subturma": false,
    "tipo": 1,
    "utiliza-nova-turma-virtual": true
  },
  {
    "ano": 2024,
    "capacidade-aluno": 45,
    "codigo-componente": "SOC801",
    "codigo-turma": "SOCIOLOGIA_BASICA_2024",
    "descricao-horario": "23M12345 7M45 7T12 (29/07/2024 - 10/08/2024), 3M12345 7M45 7T1234 (13/08/2024 - 26/08/2024), 4M3 (02/10/2024 - 27/11/2024)",
    "id-componente": 8,
    "id-discente": 130,
    "id-docente": 463,
    "id-docente-externo": 796,
    "id-modalidade-educacao": 1,
    "id-situacao-turma": 1,
    "id-turma": 8,
    "id-turma-agrupadora": 0,
    "id-unidade": 1,
    "local": "Sala 108",
    "nome-componente": "Sociologia",
    "periodo": 1,
    "sigla-nivel": "GR",
    "subturma": false,
    "tipo": 1,
    "utiliza-nova-turma-virtual": false
  },
  {
    "ano": 2024,
    "capacidade-aluno": 30,
    "codigo-componente": "GEO901",
    "codigo-turma": "GEOGRAFIA_HUMANA_2024",
    "descricao-horario": "7M123 (29/07/2024 - 31/08/2024), 7M1234 (01/09/2024 - 14/12/2024)",
    "id-componente": 9,
    "id-discente": 131,
    "id-docente": 464,
    "id-docente-externo": 797,
    "id-modalidade-educacao": 1,
    "id-situacao-turma": 1,
    "id-turma": 9,
    "id-turma-agrupadora": 0,
    "id-unidade": 1,
    "local": "Sala 109",
    "nome-componente": "Geografia",
    "periodo": 2,
    "sigla-nivel": "GR",
    "subturma": false,
    "tipo": 1,
    "utiliza-nova-turma-virtual": true
  },
  {
    "ano": 2024,
    "capacidade-aluno": 50,
    "codigo-componente": "QUI902",
    "codigo-turma": "QUIMICA_AVANCADA_2024",
    "descricao-horario": "46M12 (29/07/2024 - 04/12/2024)",
    "id-componente": 10,
    "id-discente": 132,
    "id-docente": 465,
    "id-docente-externo": 798,
    "id-modalidade-educacao": 1,
    "id-situacao-turma": 1,
    "id-turma": 10,
    "id-turma-agrupadora": 0,
    "id-unidade": 1,
    "local": "Sala 110",
    "nome-componente": "Química Avançada",
    "periodo": 1,
    "sigla-nivel": "GR",
    "subturma": false,
    "tipo": 1,
    "utiliza-nova-turma-virtual": false
  }
];

turmasRouter.get('/turmas', (req, res) => {
  const {
    'id-turma-agrupadora': idTurmaAgrupadora,
    'turma-agrupadora': turmaAgrupadora,
    'id-unidade': idUnidade,
    ano,
    periodo,
    'sigla-nivel': siglaNivel,
    'id-componente': idComponente,
    'codigo-componente': codigoComponente,
    'id-discente': idDiscente,
    'id-docente': idDocente,
    'id-docente-externo': idDocenteExterno,
    'cpf-cnpj-docente': cpfCnpjDocente,
    'descricao-horario': descricaoHorario,
    'id-situacao-turma': idSituacaoTurma,
    'nome-componente': nomeComponente,
    'utiliza-nova-turma-virtual': utilizaNovaTurmaVirtual,
    limit,
    offset,
    'order-asc': orderAsc,
    'order-desc': orderDesc
  } = req.query;

  let filteredTurmas = turmas;

  if (idTurmaAgrupadora) {
    filteredTurmas = filteredTurmas.filter(t => t['id-turma-agrupadora'] == idTurmaAgrupadora);
  }

  if (turmaAgrupadora !== undefined) {
    filteredTurmas = filteredTurmas.filter(t => t.subturma == !JSON.parse(turmaAgrupadora));
  }

  if (idUnidade) {
    filteredTurmas = filteredTurmas.filter(t => t['id-unidade'] == idUnidade);
  }

  if (ano) {
    filteredTurmas = filteredTurmas.filter(t => t.ano == ano);
  }

  if (periodo) {
    filteredTurmas = filteredTurmas.filter(t => t.periodo == periodo);
  }

  if (siglaNivel) {
    const niveis = Array.isArray(siglaNivel) ? siglaNivel : [siglaNivel];
    filteredTurmas = filteredTurmas.filter(t => niveis.includes(t['sigla-nivel']));
  }

  if (idComponente) {
    filteredTurmas = filteredTurmas.filter(t => t['id-componente'] == idComponente);
  }

  if (codigoComponente) {
    filteredTurmas = filteredTurmas.filter(t => t['codigo-componente'].includes(codigoComponente));
  }

  if (idDiscente) {
    filteredTurmas = filteredTurmas.filter(t => t['id-discente'] == idDiscente);
  }

  if (idDocente) {
    filteredTurmas = filteredTurmas.filter(t => t['id-docente'] == idDocente);
  }

  if (idDocenteExterno) {
    filteredTurmas = filteredTurmas.filter(t => t['id-docente-externo'] == idDocenteExterno);
  }

  if (cpfCnpjDocente) {
    filteredTurmas = filteredTurmas.filter(t => t['cpf-cnpj-docente'] == cpfCnpjDocente);
  }

  // Correção do nome para 'descricao-horario'
  if (descricaoHorario) {
    filteredTurmas = filteredTurmas.filter(t => t['descricao-horario'].includes(descricaoHorario));
  }

  if (idSituacaoTurma) {
    const situacoes = Array.isArray(idSituacaoTurma) ? idSituacaoTurma : [idSituacaoTurma];
    filteredTurmas = filteredTurmas.filter(t => situacoes.includes(t['id-situacao-turma']));
  }

  if (nomeComponente) {
    filteredTurmas = filteredTurmas.filter(t => t['nome-componente'].includes(nomeComponente));
  }

  if (utilizaNovaTurmaVirtual !== undefined) {
    filteredTurmas = filteredTurmas.filter(t => t['utiliza-nova-turma-virtual'] == JSON.parse(utilizaNovaTurmaVirtual));
  }

  // Ordenação por ordem crescente ou decrescente
  if (orderAsc) {
    filteredTurmas = filteredTurmas.sort((a, b) => (a[orderAsc] > b[orderAsc]) ? 1 : -1);
  } else if (orderDesc) {
    filteredTurmas = filteredTurmas.sort((a, b) => (a[orderDesc] < b[orderDesc]) ? 1 : -1);
  }

  // Aplicar paginação (limit e offset)
  const limitedTurmas = filteredTurmas.slice(offset || 0, (offset || 0) + (limit || filteredTurmas.length));

  res.json(limitedTurmas);
});

module.exports = turmasRouter;