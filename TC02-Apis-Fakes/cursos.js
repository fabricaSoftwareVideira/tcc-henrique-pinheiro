const express = require('express');
const cursosRouter = express.Router();

// Dados de exemplo para Cursos
const cursos = [
  {
    "codigo-programa-capes": "001",
    "curso": "Engenharia de Software",
    "id-coordenador": 123,
    "id-curso": 1,
    "id-modalidade-educacao": 2,
    "id-situacao-curso": 1,
    "id-unidade": 1,
    "municipio": "São Paulo",
    "nivel": "Mestrado",
    "tipo-curso": "Presencial",
    "unidade": "Universidade XYZ"
  },
  {
    "codigo-programa-capes": "002",
    "curso": "Direito",
    "id-coordenador": 124,
    "id-curso": 2,
    "id-modalidade-educacao": 3,
    "id-situacao-curso": 1,
    "id-unidade": 1,
    "municipio": "Rio de Janeiro",
    "nivel": "Graduação",
    "tipo-curso": "EAD",
    "unidade": "Universidade ABC"
  },
  {
    "codigo-programa-capes": "003",
    "curso": "Medicina",
    "id-coordenador": 125,
    "id-curso": 3,
    "id-modalidade-educacao": 2,
    "id-situacao-curso": 1,
    "id-unidade": 1,
    "municipio": "Salvador",
    "nivel": "Graduação",
    "tipo-curso": "Presencial",
    "unidade": "Universidade XYZ"
  },
  {
    "codigo-programa-capes": "004",
    "curso": "Administração",
    "id-coordenador": 126,
    "id-curso": 4,
    "id-modalidade-educacao": 3,
    "id-situacao-curso": 1,
    "id-unidade": 1,
    "municipio": "Brasília",
    "nivel": "Graduação",
    "tipo-curso": "EAD",
    "unidade": "Universidade ABC"
  },
  {
    "codigo-programa-capes": "005",
    "curso": "Biologia",
    "id-coordenador": 127,
    "id-curso": 5,
    "id-modalidade-educacao": 2,
    "id-situacao-curso": 1,
    "id-unidade": 1,
    "municipio": "Curitiba",
    "nivel": "Mestrado",
    "tipo-curso": "Presencial",
    "unidade": "Universidade XYZ"
  }
];

cursosRouter.get('/cursos', (req, res) => {
  const { curso, limit, offset } = req.query;
  let filteredCourses = cursos;

  if (curso) {
    filteredCourses = filteredCourses.filter(c => c.curso.includes(curso));
  }

  res.json(filteredCourses.slice(offset || 0, (offset || 0) + (limit || filteredCourses.length)));
});

module.exports = cursosRouter;
