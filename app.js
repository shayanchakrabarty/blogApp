const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const mongoose = require('mongoose');

//mongoose connect 
mongoose.connect('mongodb://localhost/sportsblog');
const db = mongoose.connection;

const port = 3000;

// init app
const app = express();


const index = require('./routes/index');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const manage = require('./routes/manage');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//moment setup
app.locals.moment = require('moment');

//bodyParser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//static folder setup
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Express messages
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      const namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);

app.listen(port, () => {
  console.log("App running at port :" + port);
});
