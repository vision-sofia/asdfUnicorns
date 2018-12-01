var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./models/userSchema'),
  Sport = require('./models/sportSchema'),
  Stop = require('./models/stopSchema'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/RAN');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRouter = require('./routes/userRouter');
const sportsRouter = require('./routes/sportsRouter');
sportsRouter(app);
userRouter(app);

app.get("/test", (req, res) => {
  res.send("testing")
})

app.listen(port);

console.log('RESTful API server started on: ' + port);