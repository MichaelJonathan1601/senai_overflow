const { Model, DataTypes } = require("sequelize");

class Answer extends Model {
    //Aqui configuramos os campos da tabela
    //Os campos automáticos não precisam ser declarados
    static init(sequelize){
        super.init(
            {
                description: DataTypes.TEXT,
                student_id: DataTypes.INTEGER
               
            },
            {
                sequelize,
            }
        )
    }
    //aqui configuramos os relacionamentos
    static associate(models){
        this.belongsTo(models.Student);
        this.belongsTo(models.Question);
    }
}

module.exports = Answer;