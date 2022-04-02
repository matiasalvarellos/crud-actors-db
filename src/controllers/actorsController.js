const db = require('../database/models');
const sequelize = db.sequelize;

const actorsController = {
    'list': (req, res) => {
        db.Actor.findAll()
            .then(actors => {
                res.render('actorsList.ejs', {actors})
            });
    },

    'detail': (req, res) => {
        db.Actor.findByPk(req.params.id)
        .then(actor => {
            res.render('actorsDetail.ejs', {actor});
        });
    },

    'best':(req, res) =>{
        db.Actor.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ],
            limit: 5
        })

        .then(actors => {
            res.render('actorsTopFive.ejs', {actors});
        });
    }
}

module.exports = actorsController;