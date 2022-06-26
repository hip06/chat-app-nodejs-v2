'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NoticeOffline extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    NoticeOffline.init({
        from: DataTypes.INTEGER,
        to: DataTypes.INTEGER,
        nameSender: DataTypes.STRING,
        timestamp: DataTypes.STRING,
        content: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'NoticeOffline',
    });
    return NoticeOffline;
};