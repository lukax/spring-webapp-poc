module core {
  export var module: ng.IModule;
}

core.module = angular.module("lwa.core", [])

  //Progress bar on $http requests
  .config(($httpProvider:ng.IHttpProvider) => {
    var logoutUserOn401 = ["Progress", (Progress: core.Progress) => {
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

