const express = require('express');
const app = express();

const ua = require('universal-analytics');
const visitor = ua('UA-150975737-1');

function pageRoutes(nextApp, handle) {
  
  app.get('/', (req, res) => {
    return nextApp.render(req, res, '/')
  });
  
  app.get('/explore', (req, res) => {
    return nextApp.render(req, res, '/explore', {
      page: req.query.page,
      state: req.query.state
    });
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
  
  app.get('/contact', (req, res) => {
    return nextApp.render(req, res, '/contact');
  });

  app.all('*', (req, res) => {
    return handle(req, res)
  });

  return app;
}

module.exports = pageRoutes;