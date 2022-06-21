import { Sequelize } from "sequelize";


const sequelize = new Sequelize('chatapp', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00'
});

const isConnectedDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log(`Succeed to connect database !`);
    } catch (error) {
        console.log(`Fail to connect database !: ${error}`);
    }
}

export default isConnectedDatabase