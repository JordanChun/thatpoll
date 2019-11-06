const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const apiRoutes = require('./routes/api');
const requestIp = require('request-ip');

// Blacklist the following IPs
const ips = ['10.7.164.30'];

const mongoose = require('mongoose');

const ua = require('universal-analytics');
const visitor = ua('UA-150975737-1');

mongoose.connect('mongodb://admin:8398dfejuw98j3wsfu93d@ds229088.mlab.com:29088/statmix');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});

/*
var whitelist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
*/

app.prepare().then(() => {
  const server = express();
  server.use(helmet());
  //server.use(ipfilter(ips, { mode: 'allow' }));
  //server.use(cors(corsOptionsDelegate));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(cookieParser());
  //server.use(requestIp.mw());

  server.use('/img', express.static('public'));

  server.use('/api', apiRoutes);

  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query)
  });

  server.get('/page/:num', (req, res) => {
    return app.render(req, res, '/page', { num: req.params.num });
  });
  
  server.get('/create-poll', (req, res) => {
    return app.render(req, res, '/create-poll')
  });
  
  server.get('/poll/:slug', (req, res) => {
    visitor.pageview(`/poll/${req.params.slug}`).send();
    return app.render(req, res, '/poll', { slug: req.params.slug });
  });

  server.post('*', (req, res) => {
    return handle(req, res)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // remove '0.0.0.0' on production
  server.listen(port, '0.0.0.0', err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})