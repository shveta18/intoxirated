module.exports = function (sequelize, DataTypes) {
    var Rum = sequelize.define("Rum", {
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
        year: {
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
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          },
          updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          }
    });
    return Rum;
};