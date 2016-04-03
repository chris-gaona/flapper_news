(function() {
  'use strict';

  var app = angular.module('flapperNews', [
    'flapperNews.controllers.main',
    'flapperNews.controllers.post',
    'flapperNews.controllers.nav',
    'flapperNews.controllers.auth',
    'flapperNews.services.post',
    'flapperNews.services.auth',
    'ui.router'
  ]);

})();
