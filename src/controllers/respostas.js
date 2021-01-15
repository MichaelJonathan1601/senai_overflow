const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {

    async store(req, res) {
        const { description } = req.body

        const alunoId = req.headers.authorization;
        const questionId = req.params.id;
        
        try {
             //buscar o aluno pelo ID
              let aluno = await Student.findByPk(alunoId);

             //Se aluno não existir, retorna erro
              if(!aluno)
                return res.status(404).send({ erro: "Aluno não encontrado"});

            //buscar a pergunta pelo ID
            let question = await Question.findByPk(questionId);

              //Se pergunta não existir, retorna erro
              if(!question)
              return res.status(404).send({ erro: "Pergunta não encontrada"});

            //crio a resposta para a pergunta com o aluno do authorization
             const resposta = await question.createAnswer({  description, student_id: alunoId  });

        
             //retorno sucesso
              res.status(201).send(resposta);      
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

       
        
    },
    

}
