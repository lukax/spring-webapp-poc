///<reference path="../../reference.ts"/>

module directive {
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
