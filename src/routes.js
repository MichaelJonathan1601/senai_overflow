//importa o express
const express = require("express");

const alunoController = require ("./controllers/alunos");
const perguntaController = require ("./controllers/perguntas");
const respostaController = require ("./controllers/respostas");

const routes = express.Router();

//rotas de alunos
routes.get("/alunos", alunoController.listarAlunos);

routes.post("/alunos", alunoController.adicionarAlunos);

routes.delete("/alunos/:id", alunoController.deletarAlunos);

routes.put("/alunos/:id", alunoController.editarAlunos);

routes.get("/alunos/:id", alunoController.buscarAlunos);

//rotas de perguntas

routes.post("/perguntas", perguntaController.store);

routes.put("/perguntas/:id", perguntaController.update);

routes.delete("/perguntas/:id", perguntaController.delete);

//rotas de respostas

routes.post("/perguntas/:id/respostas", respostaController.store);


module.exports = routes;
