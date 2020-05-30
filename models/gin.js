module.exports = function (sequelize, DataTypes) {
    var Gin = sequelize.define("Gin", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        style: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                len: [4, 4]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                max: 10,
                min: 1
            }
        }
    });
    return Gin;
};