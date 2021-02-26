const { Sequelize, DataTypes } = require("sequelize")
const { host ,password,username,database} = require("../config/dbConfiguration")
const Movie = require("./Movie")

const sequalize = new Sequelize({host,password,database,username,dialect:'mysql'})

sequalize.authenticate()
.then(() => {
  console.log("Database successfully authenticated")
})
.catch(reason => {
  console.log(reason)
})

const MovieModel = Movie(sequalize,DataTypes)

sequalize.sync()

module.exports = {sequalize,MovieModel}