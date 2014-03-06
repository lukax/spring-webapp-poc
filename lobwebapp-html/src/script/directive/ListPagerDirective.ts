///<reference path="../reference.d.ts"/>

export module directive {
    export class ListPagerDirective implements ng.IDirective {
        restrict = 'E';
        scope = {
            page: '=',
            changePage: '='
        };
        templateUrl = '/template/directive/ListPagerTemplate.html';
    }
}


export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("listPager", [() => new directive.ListPagerDirective()]);
};