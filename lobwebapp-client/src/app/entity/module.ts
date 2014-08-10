angular.module("lwa.entity", [])


  //Progress bar on $http requests
  .config(($httpProvider:ng.IHttpProvider) => {
    var logoutUserOn401 = ["Progress", (Progress: entity.Progress) => {
      return{
        'request': function(config) {
          Progress.start();
          return config;
        },
        'response': function(response) {
          Progress.done();
          return response;
        }
      }
    }];
    $httpProvider.interceptors.push(logoutUserOn401);
  })

  ;
