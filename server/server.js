var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var path = require("path");

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var lions = [];
var id = 0;

app.get('/lions', function(req, res){
  res.json(lions);
});

app.get('/lions/:id', function(req, res){
  var lion = _.find(lions, {id: req.params.id});
  res.json(lion || {});
});

app.post('/lions', function(req, res) {
  var lion = req.body;
  id++;
  lion.id = id + '';

  lions.push(lion);

  res.json(lion);
});


app.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.delete('/lions/:id', function(req, res) { 
    var lion = _.findIndex(lions, {id: req.params.id});
    console.log(lion); 
    if (!lions[lion]) {
	res.send("couldn't find the lion. Did Scar find him first?.");
    } else {
        var lionName = lions[lion].name;
	lions.splice(lion, 1);
        res.send(lionName + " has been taken out");
    }
});

app.set('port', (process.env.PORT || 8080));
app.set('ip', (process.env.IP || '0.0.0.0'));
app.listen(app.get('port'), app.get('ip'), function() {
 console.log("Node app is running at " + app.get('ip') + ":" + app.get('port'))
});

