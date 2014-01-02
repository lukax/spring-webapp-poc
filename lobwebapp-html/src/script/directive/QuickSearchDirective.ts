///<reference path="./../reference.d.ts"/>

export module directive {
    export class QuickSearchDirective implements ng.IDirective {
        restrict = 'E';
        replace = true;
        transclude = true;
        scope = {
            error: '=',
            label: '=',
            entityId: '=',
            entityDetail: '=',
            fetch: '&',
            quickSearch: '&'
        };
        templateUrl = '/template/directive/QuickSearchTemplate.html';
    }
}


export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("quickSearch", [() => new directive.QuickSearchDirective()]);
};