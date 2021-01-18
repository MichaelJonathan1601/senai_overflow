//importa o express
const express = require("express");

const studentController = require ("./controllers/students");
const questionController = require ("./controllers/questions");
const answerController = require ("./controllers/answers");
const feedController = require ("./controllers/feed");

const routes = express.Router();

//rotas de alunos
routes.get("/students", studentController.index);

routes.post("/students", studentController.store);

routes.delete("/students/:id", studentController.delete);

routes.put("/students/:id", studentController.update);

routes.get("/students/:id", studentController.find);

//rotas de perguntas
routes.post("/questions", questionController.store);

routes.put("/questions/:id", questionController.update);

routes.delete("/questions/:id", questionController.delete);

//rotas de respostas
routes.post("/questions/:id/answers", answerController.store);

//rotas do feed
routes.get("/feed", feedController.index);


module.exports = routes;
