///<reference path="../../reference.ts"/>

describe("controller: ListProductController", () => {

    var $scope: any;

    beforeEach(() => {
        module(($provide: ng.auto.IProvideService, $controllerProvider: ng.IControllerProvider)=>{
            $provide.service("ProductService", service.mock.ProductServiceMock);
            $provide.service("AlertService", service.impl.AlertServiceImpl);
            $provide.service("$routeParams", () => {
                return { }
            });
            $provide.service("Progress", () => {
                return { start: () => {}, done: () => {}, set: () => {} }
            });
            $provide.service("NavigatorService", service.impl.NavigatorServiceImpl);
            $controllerProvider.register("ListProductController", controller.product.ListProductController);
        });
        inject(($rootScope: ng.IRootScopeService, NavigatorService)=> {
            $scope = $rootScope.$new();
            $scope.navigator = NavigatorService;
        });
    });

    it("should list products", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService, $routeParams: any) => {
        $routeParams.search = "";
        var ctrl = $controller("ListProductController", {
            $scope: $scope
        });

        ctrl.listProduct(0);
        $timeout.flush();
        expect($scope.vm.entities).toEqual(jasmine.any(Array));
    }));

    it("should edit a product", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService, $location: ng.ILocationService) => {
        var ctrl = $controller("ListProductController", {
            $scope: $scope
        });

        ctrl.editEntity(0);
        $timeout.flush();
        expect($location.path()).toBe("/product/0");
    }));

    xit("should get searchText from url Params", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService, $routeParams: any) => {
        $routeParams.search = "SSD";
        var ctrl = $controller("ListProductController", {
            $scope: $scope
        });

        $timeout.flush();
        expect($scope.vm.searchText).toBe("SSD");
    }))
});
