'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('NoticeOfflines', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            from: {
                type: Sequelize.INTEGER
            },
            to: {
                type: Sequelize.INTEGER
            },
            nameSender: {
                type: Sequelize.STRING
            },
            timestamp: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.TEXT('long')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('NoticeOfflines');
    }
};