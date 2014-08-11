module order.edit {
  export var module: ng.IModule;
}

order.edit.module = angular.module("lwa.order.edit", [
  "lwa.core",
  "lwa.order"
])
