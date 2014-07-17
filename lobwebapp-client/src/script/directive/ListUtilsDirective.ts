///<reference path="../reference.d.ts"/>

export module directive {
	export class SearchBarDirective implements ng.IDirective {
        restrict = 'E';
        scope = {
            text: '=',
            onUpdate: '&'
        };
        templateUrl = '/template/directive/SearchBarTemplate.html';
	}

    export class ListPagerDirective implements ng.IDirective {
        restrict = 'E';
        scope = {
            page: '=',
            changePage: '&'
        };
        templateUrl = '/template/directive/ListPagerTemplate.html';
    }
}


export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("searchBar", [() => new directive.SearchBarDirective()]);
    angular.module(moduleName).lazy.directive("listPager", [() => new directive.ListPagerDirective()]);
};