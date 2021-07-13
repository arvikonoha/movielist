const { Sequelize, DataTypes } = require("sequelize")
// const { host ,password,username,database} = require("../config/dbConfiguration")
const Movie = require("./Movie")

const sequalize = new Sequelize(process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

sequalize.sync()
.then(() => {
  console.log("Sync successful")
})
.catch(reason => {
  console.log(reason,"Failed to sync")
})

const MovieModel = Movie(sequalize,DataTypes)

module.exports = {sequalize,MovieModel}