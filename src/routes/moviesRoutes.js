const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/detail/:id', moviesController.detail);

//crear pelicula
router.get('/movies/create', moviesController.add);
router.post('/movies/create',  moviesController.create);

//editar pelicula
router.get('/movies/edit/:id', moviesController.edit);

//actualizar informacion id
router.put('/movies/edit/:id', moviesController.update);

//eliminar registro id
router.delete('/movies/delete/:id',moviesController.destroy);

module.exports = router;