const { Model, DataTypes } = require("sequelize");

class Question extends Model {
    //Aqui configuramos os campos da tabela
    //Os campos automáticos não precisam ser declarados
    static init(sequelize){
        super.init(
            {
                title: DataTypes.STRING,
                description:  DataTypes.STRING,
                image:  DataTypes.STRING,
                gist:  DataTypes.STRING
            },
            {
                sequelize,
                
            }
        )
    }
    //aqui configuramos os relacionamentos
    static associate(models){
        this.belongsTo(models.Student);
        this.belongsToMany(models.Category, {through: "question_category"});
        this.hasMany(models.Answer);
    }
}

module.exports = Question;