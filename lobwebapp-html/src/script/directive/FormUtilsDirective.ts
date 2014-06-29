///<reference path="../reference.d.ts"/>

export module directive {
    export class EntityIdDirective implements ng.IDirective {
        restrict = "E";
        scope = {
            id: "="
        };
        templateUrl = "/template/directive/EntityIdTemplate.html";
    }

    export class SaveChangesDirective implements ng.IDirective {
        restrict = 'E';
        
        scope = {
            disabled: '=',
            saveDisabled: '=',
            removeDisabled: '=',
            discardDisabled: '=',
            onRemove: '&',
            onDiscard: '&'
        };
        
        templateUrl = '/template/directive/SaveChangesTemplate.html';

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("entityId", [() => new directive.EntityIdDirective()]);
    angular.module(moduleName).lazy.directive("saveChanges", [() => new directive.SaveChangesDirective()]);
};