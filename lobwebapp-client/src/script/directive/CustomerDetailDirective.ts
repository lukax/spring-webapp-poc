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

export var register = (module: ng.ILazyModule) => {
  module.directive("customerDetail", [() => new directive.CustomerDetailDirective()]);
};
