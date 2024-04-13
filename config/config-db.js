import Sequelize from 'sequelize';
import config from './config'

// config database
const sequelize = new Sequelize(
    config.db_name,
    config.db_username,
    config.db_password,
    {
      dialect: 'postgres',
    },
  );

// const sequelize = new Sequelize({
//     database: "d35aa8bd80u6sr",
//     username: "rriajhfkmnvfyj",
//     password: "2bf1fea34c93ae280b0595905075c78c0e94017d96230116c50e203d8cf34c36",
//     host: "ec2-54-196-65-186.compute-1.amazonaws.com",
//     port: 5432,
//     dialect: "postgres",
//     dialectOptions: {
//         ssl: {
//             require: true, // This will help you. But you will see nwe error
//             rejectUnauthorized: false, // This line will fix new error
//         },
//     },
// });

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.log(err));

export { sequelize };