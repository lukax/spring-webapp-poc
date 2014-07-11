///<reference path="../../reference.ts"/>

module directive {
  export class ListPagerDirective implements ng.IDirective {
    restrict = 'E';
    scope = {
      page: '=',
      changePage: '&'
    };
    template = tpl.ListPagerDirective.html;
  }
}

DirectiveModule.directive("listPager", [() => new directive.ListPagerDirective()]);
