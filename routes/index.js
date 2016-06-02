var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
// autoload de rutas que usen :quizId
router.param("quizId", quizController.load);
// Definición de rutas de /quizzes
router.get('/quizzes',                  quizController.index);
router.get('/quizzes/:quizId(\\d+)',    quizController.show);
router.get('/quizzes/:quizId(\\d+)/check',quizController.check);
router.get('/quizzes/new',                  quizController.new);
router.post('/quizzes',                  quizController.create);
// Edicion de preguntas
router.get('/quizzes/:quizId(\\d+)/edit',quizController.edit);
router.put('/quizzes/:quizId(\\d+)',    quizController.update);

router.get('/author', function(req, res, next) {
  res.render('author');
});


module.exports = router;
