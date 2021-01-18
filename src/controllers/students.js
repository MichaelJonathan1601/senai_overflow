const Student = require("../models/Student");

module.exports = {
    //função que vai ser executada pela rota
    async index(req, res){

        try {
            const students = await Student.findAll();

            res.send(students);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error })
        }

        
    },

    async find(req, res) {
        //recuperar o id do Student
        const studentId = req.params.id;
    
        //buscar o Student pelo id
        //const Student = Students.find(a => a.id.toString() === StudentId);

        try {

            let student = await Student.findByPk(studentId, {
                attributes: ["id", "name", "ra", "email"]
            });
            

             //se Student encontrado, retornar Student
             delete student.senha;

             res.send(student);

             //se Student não encontrado, retornar not found
            if (!student)
            return res.status(404).send({ erro: "Aluno não encontrado" });

           
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    
       
    
    },
    
    async store(req, res){
        //receber os dados do body
        const { ra, name, email, password } = req.body;
    
        
        try {
            //SELECT * FROM Students WHERE ra = ?
            let student = await Student.findOne({
                where: {
                    ra
                }
            })

            if(student)
                return res.status(400).send({ erro: "Aluno já cadastrado" });

             student = await Student.create({ra, name, email, password});

            res.status(201).send(student);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
       
        
        
        //incrementar o último id
        //const nextId = Students.length > 0 ? Students[Students.length - 1].id + 1 : 1;
    
        //adicionar o Student na lista
        //Students.push({ id: nextId, ra, nome, email, senha });
    
        //retornar resposta de sucesso
       
    },
    
    async delete(req, res){
        //recuperar o id do Student
        const studentId = req.params.id
    
        //retirar esse Student da lista
        //Students = Students.filter(a => a.id.toString() !== StudentId);

        try {
            let student = await Student.findByPk(studentId);

            if(!student)
                return res.status(404).send({erro : "Aluno nao encontrado"});

            await student.destroy();

            //devolver resposta de sucesso
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    
       
    },
    
    async update(req, res) {
        //recuperar o id do Student
        const studentId = req.params.id;
    
        //recuperar o dados do corpo 
        const { name, email } = req.body;
    
        //fazer a alteração
        //Students = Students.map(
            //a => a.id.toString() === StudentId ? { ...a, nome, email } : a
        //);

        try {

            let student = await Student.findByPk(studentId);
            
            if(!student)
                res.status(404).send({error: "Aluno não encontrado"});

            student.name = name;
            student.email = email;

            student.save();

            //retornar resposta
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    
        
    }
}