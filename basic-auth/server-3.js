/**
 * Created by gmhanna on may 20
 */
// makes use of express sessions

let express = require('express');
let morgan = require('morgan');
//let cookieParser = require('cookie-parser');
let session = require('express-session');
const FileStore = require('session-file-store')(session);
let hostname = 'localhost';
let port = 3000;

let app = express();

app.use(morgan('dev'));
//app.use(cookieParser('12345-67890-09876-54321')); // secret key
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

function auth(req, res, next) {
  console.log(req.headers);

  //if (!req.signedCookies.user) {
  if (!req.session.user) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      let err = new Error('You are not authenticated');
      err.status = 401;
      next(err); // bypass the rest of the express middleware
      return;
    }
    let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':'); // base64 decoding of information
    let username = auth[0];
    let password = auth[1];
    if (username === 'admin' && password === 'password') {
      //res.cookie('user', 'admin', {
      //signed: true
      //});
      req.session.user = "admin";
      next(); // authorized, go to the next module, which is static in this case
    } else {
      let err = new Error('You are not authenticated');
      err.status = 401;
      next(err); // bypass the rest of the express middleware
    }
  } else {
    //if (req.signedCookies.user === 'admin') {
    if (req.session.user === 'admin') {
      console.log('req.session: ', req.session);
      next();
    } else {
      let err = new Error('You are not authenticated');
      err.status = 401;
      next(err);
    }
  }
}

app.use(auth);
app.use(express.static(__dirname + '/public'));

app.use(function(err, req, res, next) {
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});

app.listen(port, hostname, function() {
  console.log(`Server listening at: http://${hostname}:${port}/`);
});
