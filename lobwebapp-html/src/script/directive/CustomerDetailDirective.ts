///<reference path="../reference.d.ts"/>

export module directive {
    export class CustomerDetailDirective implements ng.IDirective {

        restrict = 'E';
        replace = true;
        scope = {
            ref: '='
        };
        template =
            '<div ng-if="ref.id != 0">'
            +       '{{ref.name}}'
        +   '</div>'
        ;

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("customerDetail", [() => new directive.CustomerDetailDirective()]);
};