const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const config = require('./server.config');

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const requestIp = require('request-ip');

const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

const pageRoutes = require('./routes/index');
const apiRoutes = require('./routes/api/v1');

// MONGO ATLAS
// mongoose.connect(`mongodb+srv://UjxjklDyVCUXn5uz:NivBIzxj7MLj3VGT@statmix-juwed.mongodb.net/StatMix?retryWrites=true&w=majority`,
// { useNewUrlParser: true,
//   useUnifiedTopology: true
// });


// mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@ds229088.mlab.com:29088/statmix`,
// { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect('`mongodb://ds153715.mlab.com:53715/thatpoll', {
  auth: {
    user: 'NGWwDkXlcv',
    password: 'f089LhG0Sk'
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

var whitelist = ['http://localhost.com:3000', 'https://thatpoll.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  allowedHeaders: ['Content-Type', 'Accept', 'X-Ip']
}

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Connect to poll socket
require('./socket/poll')(io);

  app.set('socketio', io);
  app.use(helmet());
  app.use(cors(corsOptions));
  //server.use(ipfilter(ips, { mode: 'allow' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(requestIp.mw());

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
 
  // remove '0.0.0.0' on production
  server.listen(port, '0.0.0.0', err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})