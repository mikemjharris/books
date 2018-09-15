const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema, GraphQLObjectType, GraphQLString, GraphQLDateTime } = require('graphql');
const app = express();
const request=require('request')
const csv=require('csvtojson')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));

// set the view engine to ejs
app.set('view engine', 'ejs')

let books = []

const onError = () => { console.log('error') }
const onComplete = () => { console.log('complete') }

const refreshBooks = () => {
  csv()
    .fromStream(request.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSnuIE5i7X7VhTsbCcyQtLJeBkFpBiF1CMvRtv9Ze8NOMdnFXQZC1JHE40qGo83rkhsAw6CQVhZvqRW/pub?gid=50513809&single=true&output=csv'))
    .subscribe((json)=>{
      return new Promise((resolve,reject)=>{
        return resolve(json);
      })
    },onError,onComplete)
    .then((data)=> { books = data.reverse() });
}

refreshBooks();

setInterval(refreshBooks, 1000 * 60 * 60 * 1);

const getBooks = () => { return books; };

const schema = buildSchema(`
      type Query {
              books: [Book]
            },
      type Book{
              title: String,
              author: String,
              gender: String,
              year: String,
              month: String,
            }
    `);

const bookType = new GraphQLObjectType({
      name: 'book',
        fields: () => ({
                  title: { type: GraphQLString },
                  author: { type: GraphQLString },
                  gender: { type: GraphQLString },
                  year: { type: GraphQLString },
                  month: { type: GraphQLString }
                })
});

const root = {
    books: getBooks,
};

app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
}));


require('./routes/main')(app);

app.get('/', (req, res) => {
  res.render('home', { data: { title: 'Books Project'}})
})


// displays static main.html
app.get('*', function ( req, res, next ) {
  res.redirect('../');
});

app.use(function (req, res, next ) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
  app.use(function ( err, req, res ) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function ( err, req, res ) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('port', process.env.PORT || 8001);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
