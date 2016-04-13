(function() {
  'use strict';

  angular.module('flapperNews')

  //adds autofocus to the login and register input fields
  .directive('autoFocus', ['$timeout', function($timeout) {
    return {
      restrict: 'AE',
      link: function(scope, elem, attrs) {
        $timeout(function() {
          elem[0].focus();
        }, 0);
      }
    };
  }])

  .directive('loginModal', function() {
    return {
      restrict: 'AE',
      scope: {
        show: '='
      },
      transclude: true,
      // replace: true,
      link: function(scope, elem, attrs) {
        scope.modalStyle = {};

        if (attrs.width) {
          scope.modalStyle.width = attrs.width;
        }

        if (attrs.height) {
          scope.modalStyle.height = attrs.height;
        }

        scope.hideModal = function() {
          scope.show = false;
        }
      },
      templateUrl: 'partials/login'
      // template: "<div class='container' ng-show='show'><div class='modal-overlay' ng-click='hideModal()'></div><div class='modal-dialog' ng-style='modalStyle'><div class='modal-close' ng-click='hideModal()'>X</div><div class='modal-dialog-content'></div></div></div>"
    };
  })

  // .directive('modalDialog', function() {
  //   return {
  //     restrict: 'E',
  //     scope: {
  //         show: '='
  //     },
  //     replace: true,
  //     transclude: true, //insert custom content inside directive
  //     link: function(scope, elem, attrs) {
  //       scope.dialogStyle = {};
  //       if (attrs.width) {
  //         scope.dialogStyle.width = attrs.width;
  //       }
  //       if (attrs.height) {
  //         scope.dialogStyle.height = attrs.height;
  //       }
  //       scope.hideModal = function() {
  //         scope.show = false;
  //       };
  //     },
  //     template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  //   };
  // })
  //
  // .directive('likeBook', function() {
  //   return {
  //     restrict: 'E',
  //     scope: {
  //       like: '&'
  //     },
  //     template: '<input type="button" ng-click="like()" value="Like"/>'
  //   };
  // })
  //
  // .directive('notification', function() {
  //   return {
  //     restrict: 'E',
  //     scope: {
  //       message: '@'
  //     },
  //     template: '<div class="alert">{{message}}</div>'
  //   };
  // })
  //
  // .directive('bookComment', function() {
  //   return {
  //     restrict: 'E',
  //     scope: {
  //         text: '='
  //     },
  //     template: '<input type="text" ng-model="text" />'
  //   }
  // })
  //
  // .directive('helloWorld', function() {
  //   return {
  //     restrict: 'A',
  //     scope: {
  //       color: '=',
  //       changeColor: '&'
  //     },
  //     replace: true,
  //     link: function(scope, elem, attrs) {
  //       // elem.text(scope.main.message + ' ' + attrs.message);
  //       elem.text(attrs.message);
  //
  //       elem.on('click', function() {
  //         elem.css({
  //           "background-color": "white"
  //         });
  //         scope.$apply(function() {
  //           scope.color = "white";
  //         });
  //       });
  //
  //       elem.on('mouseover', function() {
  //         elem.css("cursor", "pointer");
  //         scope.$apply(function(){
  //           scope.color = scope.changeColor();
  //         });
  //       });
  //     },
  //     template: '<h1 style="background-color:{{color}}">Hello World!</h1>'
  //   }
  // });

})();
