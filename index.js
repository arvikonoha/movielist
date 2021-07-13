const express = require("express")
const path = require("path")
const app = express()
var exphbs  = require('express-handlebars');
require('dotenv').config()
const winston = require("winston")
require("newrelic")
const newrelicFormatter = require('@newrelic/winston-enricher')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.label({label: 'movielist'}),
    newrelicFormatter()
  ),
  transports:[
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'E:/NRLogs/new_relic.log'})
  ]
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars',exphbs())
app.set("view engine",'handlebars')
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/webix', express.static(__dirname + '/node_modules/webix/'));

app.use('/movieList',require('./controllers/movieList'))

app.use('/images',require('./controllers/images'))

app.get("/",(req,res) => {
  console.info("Serve movies page")
  res.render("movieTable")
})

const PORT = process.env.PORT || process.argv[2] || 8080
app.listen(PORT,() => console.log("Listening to port ",PORT))