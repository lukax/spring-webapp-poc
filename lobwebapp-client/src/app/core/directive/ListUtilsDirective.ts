///<reference path="../../reference.ts"/>

core.module
  .directive("searchBar", ():ng.IDirective => {
    return {
      restrict: 'E',
      scope: {
        text: '=',
        onUpdate: '&'
      },
      templateUrl: '/template/directive/SearchBarTemplate.html'
    }
  })

  .directive("listPager", ():ng.IDirective => {
    return {
      restrict: 'E',
      scope: {
        page: '=',
        changePage: '&'
      },
      templateUrl: '/template/directive/ListPagerTemplate.html'
    }
  })


