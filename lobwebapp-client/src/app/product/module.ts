module product{
  export var module: ng.IModule;
}

product.module = angular.module("lwa.product", [
  "lwa.core"
])
  .value("apiUrl", "/api/v1/product");
