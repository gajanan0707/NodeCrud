module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("ratings", {
        ratings: {
            type: Sequelize.INTEGER,
        }
    });

    return Rating;
};