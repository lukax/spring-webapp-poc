///<reference path="../reference.d.ts"/>

export module directive {
    export class ProductDetailDirective implements ng.IDirective {

        restrict = 'E';
        replace = true;
        scope = {
            product: '=',
            quantity: '='
        };
        template =
            '<div ng-if="product.id != 0">' +
                '<label ng-if="quantity">{{quantity}} Unid, R${{quantity * product.price}} - </label>' +
                ' {{product.name}} {{product.description}}'
        +   '</div>'
        ;

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("productDetail", [() => new directive.ProductDetailDirective()]);
};