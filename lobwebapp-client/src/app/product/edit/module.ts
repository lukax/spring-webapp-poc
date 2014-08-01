angular.module("lwa.product.edit",
  ["lwa.entity",
   "lwa.product.core",
   "ngRoute",
   "ngMaterial"])

  .config(($routeProvider:ng.route.IRouteProvider) => {
    $routeProvider
      .when("/product/:productId", {
        controller: "EditProductController",
        template: tpl.editProduct.html
      })
      .otherwise({ redirectTo: "/product/0" })
    ;
  });
