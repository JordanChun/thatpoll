require('dotenv').config();

const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev, poweredByHeader: false, });
const handle = nextApp.getRequestHandler();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const requestIp = require('request-ip');
const proxy = require('html2canvas-proxy');

const mongoose = require('mongoose');

// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

const pageRoutes = require('./routes/index');
const apiRoutes = require('./routes/api/v1');

const setClientId = require('./middleware/setClientId');

mongoose.connect(process.env.DB_HOST, {
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});

var whitelist = ['http://localhost:3000', 'http://thatpoll.com', 'https://thatpoll.com', 'http://www.thatpoll.com', 'https://www.thatpoll.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  allowedHeaders: ['Content-Type', 'Accept', 'X-Ip', 'X-Forwarded-For', 'X-CID'],
  credentials: true
}

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Connect to poll socket
require('./socket/poll')(io);

nextApp.prepare().then(() => {
  app.set('trust proxy', 1);
  app.set('socketio', io);
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser('s21Jc-2zXsQ'));
  app.use(requestIp.mw());
  app.use(setClientId);


  /*
  server.use(session({
    secret: 'super secret',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // 15 days
      autoRemove: 'native'
    }),
    resave: false,
    saveUninitialized: true
  }));
  */
 
 // routes
 app.use('/public', express.static('public'));
 app.use('/api/v1', apiRoutes);
 app.use(pageRoutes(nextApp, handle));
 
  server.listen(port, '0.0.0.0', err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});