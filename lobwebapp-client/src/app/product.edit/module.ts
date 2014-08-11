module product.edit {
  export var module:ng.IModule;
}

product.edit.module = angular.module("lwa.product.edit", [
  "lwa.core",
  "lwa.product",
  "ngRoute",
  "ngMaterial"
])

  .config(($routeProvider:ng.route.IRouteProvider) => {
    $routeProvider
      .when("/product/:productId", {
        controller: "EditProductController",
        template: tpl.editProduct.html
      })
      .otherwise({ redirectTo: "/product/0" })
    ;
  })
