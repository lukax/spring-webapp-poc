///<reference path="../../reference.ts"/>

module directive {
	export class SearchBarDirective implements ng.IDirective {
        restrict = 'E';
        scope = {
            text: '=',
            onUpdate: '&'
        };
        templateUrl = tpl.SearchBarDirective.html;
	}
}
