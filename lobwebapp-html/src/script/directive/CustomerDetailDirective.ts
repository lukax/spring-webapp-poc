///<reference path="../reference.d.ts"/>

module directive {
    export class CustomerDetailDirective implements ng.IDirective {
        restrict = "E";
        scope = {
            customer: "="
        };
        template = "{{customer.name}}";
    }
}
