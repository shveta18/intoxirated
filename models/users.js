module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        userid: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2,30]
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 15]
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
// Users will be foreign keys to UserRatings table
    Users.associate = function(models) {
        Users.hasMany(models.UserRatings, {
            // if user is deleted, all records in ratings will be deleted
            onDelete: "cascade"
        });
    };
    return Users;
};
