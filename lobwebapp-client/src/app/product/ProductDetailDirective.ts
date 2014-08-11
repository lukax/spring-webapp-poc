///<reference path="../reference.ts"/>

product.module
  .directive("productDetail", ():ng.IDirective => {
    return {
      restrict: 'E',
      scope: {
        product: "=",
        quantity: "="
      },
      templateUrl: "/template/directive/ProductDetailTemplate.html"
    }
  })

