const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const config = require('./config');

const app = next({ dev });
const handle = app.getRequestHandler();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const apiRoutes = require('./routes/api');
const requestIp = require('request-ip');

const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

const ua = require('universal-analytics');
const visitor = ua('UA-150975737-1');

mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@ds229088.mlab.com:29088/statmix`);
mongoose.set('useNewUrlParser', true);
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
  server.set('trust proxy', 1);
  //server.use(ipfilter(ips, { mode: 'allow' }));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(requestIp.mw())
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

  server.use('/public', express.static('public'));

  server.use('/api', apiRoutes);

  server.get('/', (req, res) => {
    return app.render(req, res, '/', { page: req.query.page });
  });
  
  server.get('/create-poll', (req, res) => {
    return app.render(req, res, '/create-poll')
  });
  
  server.get('/poll/:slug', (req, res) => {
    visitor.pageview(`/poll/${req.params.slug}`).send();
    return app.render(req, res, '/poll', { slug: req.params.slug });
  });

  server.get('/terms-of-service', (req, res) => {
    return app.render(req, res, '/terms-of-service');
  });

  server.get('/privacy-policy', (req, res) => {
    return app.render(req, res, '/privacy-policy');
  });

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  // server.get('*', (req, res) => {
  //   return handle(req, res)
  // })

  // remove '0.0.0.0' on production
  server.listen(port, '0.0.0.0', err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})