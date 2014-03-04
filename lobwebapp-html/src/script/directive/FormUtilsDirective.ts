///<reference path="../reference.d.ts"/>

export module directive {
    export class EntityIdDirective implements ng.IDirective {
        restrict = "E";
        replace = true;
        transclude = true;
        scope = {
            id: "="
        };
        templateUrl = "/template/directive/EntityIdTemplate.html";

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("entityId", [() => new directive.EntityIdDirective()]);
};