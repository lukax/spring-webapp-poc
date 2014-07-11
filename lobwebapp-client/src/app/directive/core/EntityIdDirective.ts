///<reference path="../../reference.ts"/>

module directive {
  export class EntityIdDirective implements ng.IDirective {
    restrict = "E";
    template = tpl.EntityIdDirective.html;
  }
}

DirectiveModule.directive("entityId", [() => new directive.EntityIdDirective()]);
