///<reference path="../reference.d.ts"/>

export module directive {
    export class SaveChangesDirective implements ng.IDirective {
        restrict = 'E';
        scope = {
            saveDisabled: '=',
            removeDisabled: '=',
            remove: '&'
        };
        templateUrl = '/template/directive/SaveChangesTemplate.html';
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("saveChanges", [() => new directive.SaveChangesDirective()]);
};