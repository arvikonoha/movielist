const express = require("express")
const path = require("path")
const app = express()
var exphbs  = require('express-handlebars');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars',exphbs())
app.set("view engine",'handlebars')
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/webix', express.static(__dirname + '/node_modules/webix/'));

app.use('/movieList',require('./controllers/movieList'))

app.get("/",(req,res) => {
  res.render("movieTable")
})

const PORT = process.env.PORT || 8080
app.listen(PORT,() => console.log("Listening to port ",PORT))