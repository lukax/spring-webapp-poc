///<reference path="./../reference.d.ts"/>

export module directive {
    export class ProductDetailDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = {
            product: '=ref',
        };
        public template =
            '<div>'
        +       '{{product.quantity}} Unid, R${{product.quantity * product.price}} - {{product.name}} {{product.description}}'
        +   '</div>'
        ;

    }
}