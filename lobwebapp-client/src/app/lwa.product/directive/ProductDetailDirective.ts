///<reference path="../../reference.d.ts"/>

function ProductDetailDirective(): ng.IDirective {
    return {
        restrict: "E",
        scope: {
            product: "=",
            quantity: "="
        },
        templateUrl: "/template/directive/ProductDetailTemplate.html"
    }
}

export = ProductDetailDirective;