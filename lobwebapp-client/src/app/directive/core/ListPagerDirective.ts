///<reference path="../../reference.ts"/>

module directive {
    export class ListPagerDirective implements ng.IDirective {
        restrict = 'E';
        scope = {
            page: '=',
            changePage: '&'
        };
        templateUrl = '/template/directive/ListPagerTemplate.html';
    }
}
