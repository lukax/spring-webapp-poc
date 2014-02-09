///<reference path="../reference.d.ts"/>

export module directive {
    export class QuickSearchDirective implements ng.IDirective {
        restrict = 'E';
        replace = true;
        transclude = true;
        scope = {
            label: '@',
            resourceUrl: '@',
            invalid: '=',
            entityId: '=',
            fetch: '&'
        };
        templateUrl = '/template/directive/QuickSearchTemplate.html';

        controller = ["$scope", "$location", ($scope: any, $location: ng.ILocationService) => {
            $scope.search = () => {
                //TODO: Support previous url parameters
                $location.url("/" + $scope.resourceUrl + "/list?redirect=" + $location.path());
            };
            
            $scope.fetchEntity = () => {
                if($scope.entityId > 0)
                    $scope.fetch();
            };

            $scope.$watch("entityId + invalid", ()=> {
                if($scope.invalid == null)
                    $scope.error = $scope.entityId == null || $scope.entityId <= 0;
                else
                    $scope.error = $scope.invalid;
            });
            
        }];
    }
}


export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.directive("quickSearch", [() => new directive.QuickSearchDirective()]);
};