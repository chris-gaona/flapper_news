(function() {
  'use strict';

  var app = angular.module('flapperNews', [
    'flapperNews.controllers.main',
    'flapperNews.controllers.post',
    'flapperNews.controllers.nav',
    'flapperNews.controllers.auth',
    'flapperNews.controllers.user',
    'flapperNews.services.post',
    'flapperNews.services.auth',
    'flapperNews.services.user',
    'ui.router'
  ]);

  // TODO: add post delete functionality
  // TODO: add user personal page functionality
      // TODO: add authorization to personal page
      // TODO: make only current user access their page
  // TODO: make header, nav, & footer main parent state

})();
