const { Model, DataTypes } = require("sequelize");

class Question extends Model {
    //Aqui configuramos os campos da tabela
    //Os campos automáticos não precisam ser declarados
    static init(sequelize){
        super.init(
            {
                titulo: DataTypes.STRING,
                descricao:  DataTypes.STRING,
                imagem:  DataTypes.STRING,
                gist:  DataTypes.STRING
            },
            {
                sequelize,
                tableName: "perguntas"
            }
        )
    }
    //aqui configuramos os relacionamentos
    static associate(models){
        this.belongsTo(models.Student, { foreignKey: "aluno_id" });
        this.belongsToMany(models.Category, {through: "question_category"});
        this.hasMany(models.Answer);
    }
}

module.exports = Question;