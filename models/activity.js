// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var moment = require('moment');
// Creating our Activity model
module.exports = function(sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
            // The email cannot be null, and must be a proper email before creation
            hour: {
                type: DataTypes.STRING,

                //  allowNull: false
            },
            food: {
                type: DataTypes.STRING,
                //allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                //allowNull: false,
            },
            calories: {
                type: DataTypes.INTEGER,
                //allowNull: false,
            },

            totalCalories: {
                type: DataTypes.INTEGER,
                //allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATEONLY,

            }

        }, {
            hooks: {

                beforeCreate: (activity, options, cb) => {
                    console.log('calculating total calories');
                    activity.totalCalories = (activity.quantity * activity.calories);
                    activity.hour = moment().format("LT");
                    activity.updatedAt = moment().format('YYYY-MM-DD');
                    console.log('calculated total calories', activity.totalCalories);

                    cb(null, options);

                }
            },
            timestamps: false
        }

    );
    return Activity;

};
