module customer.list {
  export var module: ng.IModule;
}

customer.list.module = angular.module("lwa.customer.list", [
  "lwa.core",
  "lwa.customer"
])
