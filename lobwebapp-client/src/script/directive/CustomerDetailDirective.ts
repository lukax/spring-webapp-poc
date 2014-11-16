///<reference path="../reference.d.ts"/>

export function CustomerDetailDirective() : ng.IDirective {
    return {
        restrict: "E",
        scope: {
            customer: "="
        },
        template: "{{customer.name}}"
    };
}