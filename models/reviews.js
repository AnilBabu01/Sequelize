module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define("review", {
    reting: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return review;
};
