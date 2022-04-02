module.exports = (sequelize, dataTypes) => {
    let alias = 'ActorMovie';
    let cols = {
        actor_id: {
            type: dataTypes.INTEGER,
        },
        movie_id: {
            type: dataTypes.INTEGER,
        }
    };

    let config = {
        tableName: 'actor_movie',
        timestamps: false
    };

    const ActorMovie = sequelize.define(alias, cols, config);

    return ActorMovie
}