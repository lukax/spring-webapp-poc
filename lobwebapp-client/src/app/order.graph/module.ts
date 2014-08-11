module order.graph {
  export var module: ng.IModule;
}

order.graph.module = angular.module("lwa.order.graph", [
  "lwa.core",
  "lwa.order"
])
