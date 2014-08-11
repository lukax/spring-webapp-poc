module auth{
  export var module: ng.IModule;
}

auth.module = angular.module("lwa.auth", [
  "lwa.core"
])
