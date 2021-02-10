const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const student = await Student.findOne({
        where: {
          email,
        },
      });

      if (!student || !bcrypt.compareSync(password, student.password))
        return res.status(403).send({ error: "Usuário e/ou senha inválidos" });

      const token = generateToken({
        studentId: student.id,
        studentName: student.name,
      });

      setTimeout(() => {
        res.status(201).send({
          student: {
            studentId: student.id,
            name: student.name,
            ra: student.ra,
            email: student.email,
            profile_image: student.profile_image,
          },
          token,
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
