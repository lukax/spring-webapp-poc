module order.list {
  export var module: ng.IModule;
}

order.list.module = angular.module("lwa.order.list", [
  "lwa.core",
  "lwa.order"
])
