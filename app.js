const express = require('express');
const expressHandlebars = require('express-handlebars');
const dataFile = require('./public/data');
const eventsFile = require('./public/events');
const bodyParser = require('body-parser');
const app = express();

app.engine('handlebars', expressHandlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', function(req, res){

  res.render('home', dataFile)
});
// app.get('/home', function(req, res){
//     res.render('home', dataFile);
//   });
app.get('/events', function(req, res){
    res.render('events', eventsFile);
  });

app.get('/menu', function(req, res){
//for loop if value key is null, target same place and assign it to string "availble for hire" console.log(dataFile)
for (var i = 0; i < dataFile.menuItems.length; i++) {
  if (dataFile.menuItems[i].itemName === null){
        let i = "_"
        dataFile.menuItems[i].itemName = "Come in to check it out!";
        // document.querySelector('.job').style.color = "red";
  }
}

  res.render('menu', dataFile)
});



app.get("/:menuItem", function(req, res){
  let menuItem = req.params.menuItem;
  for (var i = 0; i < dataFile.menuItems.length; i++) {
    if(dataFile.menuItems[i].itemName === (menuItem)){
    res.render('menuItem', dataFile.menuItems[i]);
    }

  }
});





app.listen(4040);
console.log("listening at 4040");
