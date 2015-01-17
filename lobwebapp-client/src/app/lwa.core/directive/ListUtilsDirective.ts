///<reference path="../../reference.d.ts"/>

export function SearchBarDirective(): ng.IDirective {
    return {
        restrict: 'E',
        scope: {
            text: '=',
            onUpdate: '&'
        },
        templateUrl: '/template/directive/SearchBarTemplate.html'
    }
}

export function ListPagerDirective(): ng.IDirective {
    return {
        restrict: 'E',
        scope: {
            page: '=',
            changePage: '&'
        },
        templateUrl: '/template/directive/ListPagerTemplate.html'
    }
}
