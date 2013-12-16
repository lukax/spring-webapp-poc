///<reference path="./../reference.d.ts"/>

export module directive {
    export class ProductDetailDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = {
            product: '=',
            quantity: '='
        };
        public template =
            '<div ng-if="product.id != 0">' +
                '<label ng-if="quantity">{{quantity}} Unid, R${{quantity * product.price}} - </label>' +
                ' {{product.name}} {{product.description}}'
        +   '</div>'
        ;

    }
}