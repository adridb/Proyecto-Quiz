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

// sequelize.sync() crea e inicializa la tabla de preguntas en la bbdd
sequelize.sync()
    .then(function() { // sync() crea la tabla quiz
        return Quiz.count()
         .then(function (c) {
                    if (c === 0) {   // la tabla se inicializa solo si está vacía
                        return Quiz.bulkCreate([ {question: "Capital de Italia", answer: "Roma"},
                        	                     {question: "Capital de Portugal",answer: "Lisboa"}
                        	                   ])
                           .then(function(){
                             console.log('Base de datos inicializada con datos');
                                    });
                    }
                });
 }).catch(function(error) {
        console.log("Error Sincronizando las tablas de la BBDD:", error);
        process.exit(1);
    });

 exports.Quiz = Quiz; // Exportar definición de la tabla Quiz
   

