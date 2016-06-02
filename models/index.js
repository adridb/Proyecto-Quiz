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


 exports.Quiz = Quiz; // Exportar definición de la tabla Quiz
   

