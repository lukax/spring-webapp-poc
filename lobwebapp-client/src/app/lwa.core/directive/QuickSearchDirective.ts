///<reference path="../../reference.d.ts"/>

export function QuickSearchDirective(): ng.IDirective {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            label: '@',
            resourceUrl: '@',
            invalid: '=',
            entityId: '=',
            fetch: '&'
        },
        templateUrl: '/template/directive/QuickSearchTemplate.html',
        controller: ["$scope", "$location", ($scope: any, $location: ng.ILocationService) => {
            $scope.search = () => {
                $location.url("/" + $scope.resourceUrl + "/list?redirect=" + encodeURIComponent($location.url()));
            };

            $scope.fetchEntity = () => {
                if ($scope.entityId > 0)
                    $scope.fetch();
            };

            $scope.$watch("entityId + invalid", () => {
                if ($scope.invalid != null)
                    $scope.error = $scope.invalid;
            });

        }]
    }
}
