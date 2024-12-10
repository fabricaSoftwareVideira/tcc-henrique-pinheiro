    const express = require('express');
    const discentesRouter = express.Router();

    const discentes = [
      // Alunos da Turma 1
      {
        "ano-ingresso": 2020,
        "cpf-cnpj": "68794178500",
        "descricao-forma-ingresso": "Vestibular",
        "email": "discente1@exemplo.com",
        "id-curso": 1,
        "id-discente": 1,
        "id-forma-ingresso": 1,
        "id-institucional": 12345,
        "instituicao-ensino": "Universidade XYZ",
        "login": "discente1",
        "matricula": 20200001,
        "nome-curso": "Engenharia de Software",
        "nome-discente": "Maria Silva",
        "periodo-ingresso": 1,
        "sigla-nivel": "GR"
      },
      {
        "ano-ingresso": 2020,
        "cpf-cnpj": "12165941040",
        "descricao-forma-ingresso": "Enem",
        "email": "discente2@exemplo.com",
        "id-curso": 2,
        "id-discente": 2,
        "id-forma-ingresso": 2,
        "id-institucional": 67890,
        "instituicao-ensino": "Universidade ABC",
        "login": "discente2",
        "matricula": 20200002,
        "nome-curso": "Direito",
        "nome-discente": "João Souza",
        "periodo-ingresso": 1,
        "sigla-nivel": "GR"
      },
      {
        "ano-ingresso": 2024,
        "cpf-cnpj": "19080124478",
        "descricao-forma-ingresso": "Vestibular",
        "email": "discente3@exemplo.com",
        "id-curso": 1,
        "id-discente": 3,
        "id-forma-ingresso": 1,
        "id-institucional": 65432,
        "instituicao-ensino": "Universidade XYZ",
        "login": "discente3",
        "matricula": 20240015,
        "nome-curso": "Engenharia de Software",
        "nome-discente": "Rodrigo Carvalho",
        "periodo-ingresso": 1,
        "sigla-nivel": "GR"
      },
      // Alunos da Turma 2
      {
        "ano-ingresso": 2021,
        "cpf-cnpj": "11656285541",
        "descricao-forma-ingresso": "Vestibular",
        "email": "discente4@exemplo.com",
        "id-curso": 1,
        "id-discente": 4,
        "id-forma-ingresso": 1,
        "id-institucional": 54321,
        "instituicao-ensino": "Universidade XYZ",
        "login": "discente4",
        "matricula": 20210001,
        "nome-curso": "Engenharia de Software",
        "nome-discente": "Ana Pereira",
        "periodo-ingresso": 1,
        "sigla-nivel": "GR"
      },
      {
        "ano-ingresso": 2024,
        "cpf-cnpj": "62201254605",
        "descricao-forma-ingresso": "Enem",
        "email": "discente5@exemplo.com",
        "id-curso": 2,
        "id-discente": 5,
        "id-forma-ingresso": 2,
        "id-institucional": 54321,
        "instituicao-ensino": "Universidade ABC",
        "login": "discente5",
        "matricula": 20240016,
        "nome-curso": "Direito",
        "nome-discente": "Cecília Duarte",
        "periodo-ingresso": 1,
        "sigla-nivel": "GR"
      },
      // Alunos da Turma 3
      {
        "ano-ingresso": 2022,
        "cpf-cnpj": "02123361186",
        "descricao-forma-ingresso": "Vestibular",
        "email": "discente6@exemplo.com",
        "id-curso": 3,
        "id-discente": 6,
        "id-forma-ingresso": 1,
        "id-institucional": 23456,
        "instituicao-ensino": "Universidade XYZ",
        "login": "discente6",
        "matricula": 20220001,
        "nome-curso": "Física",
        "nome-discente": "Carlos Santana",
        "periodo-ingresso": 1,
        "sigla-nivel": "GR"
      },
      {
        "ano-ingresso": 2024,
        "cpf-cnpj": "99943196980",
        "descricao-forma-ingresso": "Enem",
        "email": "discente7@exemplo.com",
        "id-curso": 3,
        "id-discente": 7,
        "id-forma-ingresso": 1,
        "id-institucional": 54322,
        "instituicao-ensino": "Universidade XYZ",
        "login": "discente7",
        "matricula": 20240007,
        "nome-curso": "Física",
        "nome-discente": "Gustavo Nunes",
        "periodo-ingresso": 1,
        "sigla-nivel": "GR"
      },
      // Alunos da Turma 4
      {
        "ano-ingresso": 2023,
        "cpf-cnpj": "79379054769",
        "descricao-forma-ingresso": "Enem",
        "email": "discente8@exemplo.com",
        "id-curso": 4,
        "id-discente": 8,
        "id-forma-ingresso": 2,
        "id-institucional": 98765,
        "instituicao-ensino": "Universidade ABC",
        "login": "discente8",
        "matricula": 20230001,
        "nome-curso": "Química",
        "nome-discente": "Patrícia Almeida",
        "periodo-ingresso": 1,
        "sigla-nivel": "GR"
      }
    ];

    discentesRouter.get('/discentes', (req, res) => {
      const { cpf } = req.query;
      console.log(cpf)
      let result = [];
    
      // Se o CPF for fornecido, filtramos apenas pelo CPF
      if (cpf) {
        // Remove caracteres não numéricos do CPF fornecido
        const normalizedCpf = cpf.replace(/\D/g, '');
    
        // Procura o primeiro discente com o CPF correspondente
        const discenteEncontrado = discentes.find(d => {
          const discenteCpf = d['cpf-cnpj'].replace(/\D/g, ''); // Remove caracteres não numéricos do CPF armazenado
          return discenteCpf === normalizedCpf;
        });
    
        // Se encontrar um discente, adiciona ao resultado como um array de um elemento
        if (discenteEncontrado) {
          result = [discenteEncontrado];
        }
      }
    
      res.json(result);
    });
    
    

    module.exports = discentesRouter;