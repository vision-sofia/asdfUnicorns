var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./models/userSchema'),
  Sport = require('./models/sportSchema'),
  Stop = require('./models/stopSchema'),
  Culture = require('./models/cultureSchema'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/RAN');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const userRouter = require('./routes/userRouter');
const sportsRouter = require('./routes/sportsRouter');
const cultureRouter = require('./routes/cultureRouter');
sportsRouter(app);
userRouter(app);
cultureRouter(app);

app.get("/test", (req, res) => {
  res.send("testing")
})

app.listen(port);

console.log('RESTful API server started on: ' + port);