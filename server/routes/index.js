const express = require('express');
const server = express();

const ua = require('universal-analytics');
const visitor = ua('UA-150975737-1');

function pageRoutes(app, handle) {
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
  
  server.get('/feedback', (req, res) => {
    return app.render(req, res, '/feedback');
  });

  server.all('*', (req, res) => {
    return handle(req, res)
  });

  return server;
}


module.exports = pageRoutes;