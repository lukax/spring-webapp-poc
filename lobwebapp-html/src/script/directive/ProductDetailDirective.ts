///<reference path="../reference.d.ts"/>

export module directive {
    export class ProductDetailDirective implements ng.IDirective {
        restrict = "E";
        scope = {
            product: "=",
            quantity: "="
        };
        templateUrl = "/template/directive/ProductDetailTemplate.html";

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("productDetail", [() => new directive.ProductDetailDirective()]);
};