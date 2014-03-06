///<reference path="../reference.d.ts"/>

export module directive {
    export class SaveChangesDirective implements ng.IDirective {
        restrict = 'E';
        scope = {
            saveDisabled: '=',
            removeDisabled: '=',
            onRemove: '&'
        };
        templateUrl = '/template/directive/SaveChangesTemplate.html';
        link = (scope, element, attrs) => {
            scope.saveLabel = "Salvar";
            
            scope.save = () => {
                scope.saveLabel = "Salvando...";
                };
            scope.$watch("saveDisabled", () => {
                if(!scope.saveDisabled)
                    scope.saveLabel = "Salvar";
                });

            scope.remove = () => {
                scope.saveLabel = "";
                scope.removeLabel = "Removendo..."
                scope.onRemove();
                };
            scope.$watch("removeDisabled", () => {
                if(!scope.removeDisabled){
                    scope.saveLabel = "Salvar";
                    scope.removeLabel = "";
                }
                });
        };
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("saveChanges", [() => new directive.SaveChangesDirective()]);
};