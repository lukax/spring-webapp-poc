module stock.list {
  export var module:ng.IModule;
}

stock.list.module = angular.module("lwa.stock.list", [
  "lwa.core",
  "lwa.stock"
])
