///<reference path="../reference.d.ts"/>

export module directive {
    export class CustomerDetailDirective implements ng.IDirective {
        restrict = "E";
        scope = {
            customer: "="
        };
        template = "{{customer.name}}";
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("customerDetail", [() => new directive.CustomerDetailDirective()]);
};