const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

//Mostrar listado de actores
router.get('/actors', actorsController.list);

//detalle de actores
router.get('/actors/detail/:id', actorsController.detail);

//actores por rating (primeros 5)
router.get('/actors/topFive', actorsController.best);

//Creación un actor
// router.get('/actors/create', actorsController.add);
// router.post('/actors/create', actorsController.create);

//Edición un actor
// router.get('/actors/edit/:id', actorsController.edit);
// router.put('/actors/edit/:id', actorsController.update);

//Elimina el registro 
// router.delete('/actors/delete/:id ', actorsController.destroy);

module.exports = router;