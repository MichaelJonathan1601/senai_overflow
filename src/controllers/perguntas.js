const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {
    index(req, res) {

    },

    async store(req, res) {
        const { titulo, descricao, imagem, gist, categorias} = req.body

        const alunoId = req.headers.authorization;
        
        try {
             //buscar o aluno pelo ID
              let aluno = await Student.findByPk(alunoId);

             //Se aluno não existir, retorna erro
              if(!aluno)
                return res.status(404).send({ erro: "Aluno não encontrado"});

             //crio a pergunta para o aluno
              let pergunta = await aluno.createQuestion({ titulo, descricao, imagem, gist});

             await pergunta.addCategories(categorias);

             //retorno sucesso
              res.status(201).send(pergunta);      
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

       
        
    },

    find(req, res) {

    },

    async update(req, res) {
        const { titulo, descricao } = req.body

        const studentId = req.headers.authorization;
        const questionId = req.params.id;

        try {
             //buscar o aluno pelo ID
             let aluno = await Student.findByPk(studentId);

              //Se aluno não existir, retorna erro
              if(!aluno)
                return res.status(404).send({ erro: "Aluno não encontrado"});

            //buscar a pergunta pelo ID
            let question = await Question.findByPk(questionId);

              //Se pergunta não existir, retorna erro
              if(!question)
              return res.status(404).send({ erro: "Pergunta não encontrada"});

              if(question.aluno_id.toString() !== studentId)
                res.status(401).send({erro: "Não autorizado"})  

             
            question.titulo = titulo;
            question.descricao = descricao;

            question.save();

             //retorno sucesso
              res.status(201).send(question);   


        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        const questionId  = req.params.id;

        const studentId = req.headers.authorization;

        try {
            const question = await Question.findOne({ 
                where: 
                { 
                    aluno_id: studentId, 
                    id: questionId 
                } 
            });

            if(!question)
                res.status(404).send({ erro: "Questão não foi encontrada" });

            await question.destroy();

            res.status(204).send();

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}