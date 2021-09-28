module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("ratings", {
        rating: {
            type: Sequelize.INTEGER,
        }
    });

    return Rating;
};