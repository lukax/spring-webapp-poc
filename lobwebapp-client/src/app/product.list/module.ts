module product.list {
  export var module:ng.IModule;
}

product.list.module = angular.module("lwa.product.list", [
  "lwa.core",
  "lwa.product"
])
