import Sequelize from 'sequelize';
import config from './config'

// // config database
// const sequelize = new Sequelize(
//     config.db_name,
//     config.db_username,
//     config.db_password,
//     {
//       dialect: 'postgres',
//     },
//   );

const sequelize = new Sequelize({
    database: "d8r3jiqauv5vm1",
    username: "jqtunjvqpxgoix",
    password: "e878d3058dab7483cf938585ff5781feaadc95d58e8c5997e2dbf466669010a7",
    host: "ec2-35-169-188-58.compute-1.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false, // This line will fix new error
        },
    },
});

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.log(err));

export { sequelize };