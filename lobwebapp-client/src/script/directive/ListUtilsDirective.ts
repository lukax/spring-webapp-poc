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


export var register = (module: ng.ILazyModule) => {
  module.directive("searchBar", [() => new directive.SearchBarDirective()]);
  module.directive("listPager", [() => new directive.ListPagerDirective()]);
};
