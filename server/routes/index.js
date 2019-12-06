const express = require('express');
const app = express();

const ua = require('universal-analytics');
const visitor = ua('UA-150975737-1');

function pageRoutes(nextApp, handle) {
  app.get('/', (req, res) => {
    return nextApp.render(req, res, '/', {
      page: req.query.page,
      state: req.query.state
    });
  });
  
  app.get('/create-poll', (req, res) => {
    return nextApp.render(req, res, '/create-poll')
  });
  
  app.get('/poll/:slug', (req, res) => {
    visitor.pageview(`/poll/${req.params.slug}`).send();
    return nextApp.render(req, res, '/poll', { slug: req.params.slug });
  });
  
  app.get('/terms-of-service', (req, res) => {
    return nextApp.render(req, res, '/terms-of-service');
  });
  
  app.get('/privacy-policy', (req, res) => {
    return nextApp.render(req, res, '/privacy-policy');
  });
  
  app.get('/feedback', (req, res) => {
    return nextApp.render(req, res, '/feedback');
  });

  app.all('*', (req, res) => {
    return handle(req, res)
  });

  return app;
}

module.exports = pageRoutes;