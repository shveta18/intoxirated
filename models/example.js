module.exports = function(sequelize, DataTypes) {
  var Wines = sequelize.define("Wines", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
        }
    },
    maker: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        max: 5,
        min: 1
      }
    }
  });
  return Wines;
};
