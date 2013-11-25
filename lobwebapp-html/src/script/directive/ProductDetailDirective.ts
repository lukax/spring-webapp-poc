///<reference path="./../reference.d.ts"/>

export module directive {
    export class ProductDetailDirective implements ng.IDirective {

        public restrict = 'E';
        public replace = true;
        public scope = {
            ref: '=',
        };
        public template =
            '<div ng-if="ref.id != 0">'
            +       '{{ref.quantity}} Unid, R${{ref.quantity * ref.price}} - {{ref.name}} {{ref.description}}'
        +   '</div>'
        ;

    }
}