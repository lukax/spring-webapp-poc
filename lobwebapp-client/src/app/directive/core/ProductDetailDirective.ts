///<reference path="../../reference.ts"/>

module directive {
    export class ProductDetailDirective implements ng.IDirective {
        restrict = "E";
        scope = {
            product: "=",
            quantity: "="
        };
        template = tpl.ProductDetailDirective.html;

    }
}
