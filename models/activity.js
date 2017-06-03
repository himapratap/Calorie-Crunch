// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines

// Creating our Activity model
module.exports = function(sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
            // The email cannot be null, and must be a proper email before creation
            time: {
                type: DataTypes.DATEONLY,
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
            }

        }, {
            hooks: {

                beforeCreate: (activity, options, cb) => {
                    console.log('calculating total calories');
                    activity.totalCalories = (activity.quantity * activity.calories);
                    console.log('calculated total calories', activity.totalCalories);

                    cb(null, options);

                }
            }
        }

    );
    return Activity;

};
