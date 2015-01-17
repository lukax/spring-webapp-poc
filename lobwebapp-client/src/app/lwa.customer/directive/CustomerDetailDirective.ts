///<reference path="../../reference.d.ts"/>

function CustomerDetailDirective() : ng.IDirective {
    return {
        restrict: "E",
        scope: {
            customer: "="
        },
        template: "{{customer.name}}"
    };
}

export = CustomerDetailDirective;
