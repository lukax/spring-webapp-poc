angular.module("lwa.product.edit",
  ["lwa.entity",
   "lwa.product.core",
   "ngRoute",
   "ngMaterial"])

  .config(($routeProvider:ng.route.IRouteProvider) => {
    $routeProvider
      .when("/product/edit", {
        controller: "EditProductController",
        template: tpl.editProduct.html
      })
      .otherwise({ redirectTo: "/product/edit" })
    ;
  });
