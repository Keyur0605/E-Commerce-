const { Sequelize } = require("sequelize");

// Local Database
// const sequelize = new Sequelize(process.env.DATABASE_NAME, "root", process.env.DATABASE_PASSWORD, {
//     host: "localhost",
//     dialect: "mysql"
// });

// AWS Database
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
});

sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((err) => {
    console.log("Unable to connect to the database.");
});

module.exports = sequelize