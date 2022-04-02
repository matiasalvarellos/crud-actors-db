const db = require('../database/models');
const sequelize = db.sequelize;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: [{association: "genres"}]
        })
        .then(function(movies){
            res.render('moviesList', {movies})
        })
    },

    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
        .then(function(movie){
            res.render('moviesDetail', {movie});
        });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })

        .then(function(movies){
            res.render('newestMovies', {movies});
        });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
        .then(function (movies){
            res.render('recommendedMovies.ejs', {movies});
        });
    },
    'add': (req, res) => {
        db.Actor.findAll()
        .then(function (actors){
            res.render('moviesAdd', {actors: actors});
        })
    },
    'create':(req, res) => {

        db.Movie.create({
            title:req.body.title,
            rating:req.body.rating,
            length:req.body.length,
            awards:req.body.awards,
            release_date: req.body.release_date,
        }).then(function(movie){
            //al metodo setActors le paso los id de los actores que seleccione
            //esto setea los registros en la tabla pivot(actor_movie)
            return movie.setActors(req.body.actors)
        })
        .then(function(){
           return res.redirect("/movies")
        });    
    },
    'edit': (req, res) =>{
        let actors = db.Actor.findAll();
        let movie = db.Movie.findByPk(req.params.id);

        Promise.all([actors, movie])
        .then(function([actors, movie]){
            return res.render('moviesEdit', {actors: actors, movie:movie});
        });
    },

    'update':(req, res) =>{
        db.Movie.update({
            title:req.body.title,
            rating:req.body.rating,
            length:req.body.length,
            awards:req.body.awards,
           release_date: req.body.release_date
        }, {
            where:{
                id: req.params.id
            }
        })
        .then(function(){
            return db.Movie.findByPk(req.params.id) 
        })
        .then(function(movieFound){
            //al metodo setActors le paso los id de los actores que seleccione
            //esto setea/actualiza los registros en la tabla pivot(actor_movie)
           return movieFound.setActors(req.body.actors)
        })
        .then(function(){
           return res.redirect("/movies")
        })
    }, 
    'destroy':(req, res) =>{
        //actualizo la tabla actores
        //cambio todos los favorite_movies_id, de los actores que tengan el id de la pelicula a eliminar, por null
        db.Actor.update({
            favorite_movie_id: null
        },{
            where:{
                favorite_movie_id: req.params.id
            }
        })
        .then(function(){
            //llamo a la tabla pivot
            //elimino todos los registros de la tabla pivot que tengan el id de la pelicula a eliminar
            return db.ActorMovie.destroy({
                where:{
                    movie_id: req.params.id
                }
            })
        })
        .then(function(){
            //elimino la pelicula
            return db.Movie.destroy({
                where:{
                    id: req.params.id
                }
            })
        })
        .then(function(){
            return res.redirect("/movies")
        })

        //----- Otra forma de hacerlo ----- //

        // db.Actor.update({
        //     favorite_movie_id: null
        // },{
        //     where:{
        //         favorite_movie_id: req.params.id
        //     }
        // })
        // .then(function(){
        //     return db.Movie.findByPk(req.params.id)
        // })
        // .then(function(movieFound){
        //     //elimino los registros de la tabla pivot con metodo setActors pasando array vacio
        //     return movieFound.setActors([]);
        // })
        // .then(function(){
        //     //elimino la pelicula
        //     return db.Movie.destroy({
        //         where:{
        //             id: req.params.id
        //         }
        //     })
        // })
        // .then(function(){
        //     return res.redirect("/movies")
        // })
        
    }
}


module.exports = moviesController;