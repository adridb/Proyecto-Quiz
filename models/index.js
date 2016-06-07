var path = require('path');

//cargar modelo orm	
var Sequelize = require('sequelize');

//usar bbdd Sqllite
//var sequelize = new Sequelize(null,null,null,
//1	                   {dialect: "SqLite",storage: "quiz.sqLite"});

//BBDD SQLite;
var url,storage;
if(!process.env.DATABASE_URL){
	url = "sqlite:///";
	storage = "quiz.sqlite";
} else {
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_URL || "";
}
var sequelize = new Sequelize(url,
	                          {storage: storage,
	                          	omitNull: true
	                          });

// importar def de la tabla de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
// definicion de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));
//definicion tabla uisuarios
var User = sequelize.import(path.join(__dirname,'user'));
//relacion entre modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

User.hasMany(Quiz,{foreignKey: 'AuthorId'});
Quiz.belongsTo(User,{as: 'Author', foreignKey: 'AuthorId'});

 exports.Quiz = Quiz; // Exportar definición de la tabla Quiz
 exports.Comment = Comment;
 exports.User = User;

