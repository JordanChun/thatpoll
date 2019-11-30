const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const config = require('./server.config');

const app = next({ dev });
const handle = app.getRequestHandler();
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
// mongoose.connect(`mongodb+srv://UjxjklDyVCUXn5uz:NivBIzxj7MLj3VGT@statmix-juwed.mongodb.net/StatMix?retryWrites=true&w=majority`,
// { useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@ds229088.mlab.com:29088/statmix`,
// { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// mongoose.connect(`mongodb://NGWwDkXlcv:f089LhG0Sk@ds153715.mlab.com:53715/thatpoll`,
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

app.prepare().then(() => {
  const server = express();
  server.use(helmet());
  server.use(cors({
    origin: 'http://localhost.com:3000',
    allowedHeaders: ['Content-Type', 'Accept', 'X-Ip']
  }));
  //server.use(ipfilter(ips, { mode: 'allow' }));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(requestIp.mw());
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
  server.use('/public', express.static('public'));
  server.use('/api/v1', apiRoutes);
  server.use(pageRoutes(app, handle));

  // remove '0.0.0.0' on production
  server.listen(port, '0.0.0.0', err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})