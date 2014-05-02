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
            onRemove: '&',
            discardChangesEnabled: '=',
            onDiscardChanges: '&'
        };
        templateUrl = '/template/directive/SaveChangesTemplate.html';
        link = (scope, element, attrs) => {
            scope.saveLabel = "Salvar";
            
            scope.save = () => {
                scope.saveLabel = "Salvando...";
                };

            scope.remove = () => {
                scope.saveLabel = "";
                scope.removeLabel = "Removendo..."
                scope.onRemove();
                };

            scope.discardChanges = () => {
                scope.saveLabel = "";
                scope.discardChangesLabel = "Descartando alterações...";
                if(scope.onDiscardChanges) 
                    scope.onDiscardChanges();
                };

            scope.$watch("saveDisabled + removeDisabled + discardChangesEnabled", () => {
                if(!scope.saveDisabled || !scope.removeDisabled || scope.discardChangesEnabled){
                    scope.saveLabel = "Salvar";
                    scope.removeLabel = "";
                    scope.discardChangesLabel = "";
                }
                });
   
        };
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("entityId", [() => new directive.EntityIdDirective()]);
    angular.module(moduleName).lazy.directive("saveChanges", [() => new directive.SaveChangesDirective()]);
};