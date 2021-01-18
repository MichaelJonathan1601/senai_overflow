const { Model, DataTypes } = require("sequelize");

class Student extends Model {
    //Aqui configuramos os campos da tabela
    //Os campos automáticos não precisam ser declarados
    static init(sequelize){
        super.init(
            {
                ra: DataTypes.STRING,
                name:  DataTypes.STRING,
                email:  DataTypes.STRING,
                password:  DataTypes.STRING
            },
            {
                sequelize,

            }
        )
    }
    //aqui configuramos os relacionamentos
    static associate(models){
        this.hasMany(models.Question);
        this.hasMany(models.Answer);
    }
}

module.exports = Student;