const sequelize = require('../models/dbConnect');

module.exports = (DataTypes) => {
    const Short = sequelize.define('urls', {
        code: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false,
        },
        longUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
        created: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        expire: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        clicks: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
    }, {
        timestamps: false,
    });
    return Short;
};