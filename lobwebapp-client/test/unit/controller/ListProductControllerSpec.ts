///<reference path="../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
///<amd-dependency path="underscore"/>
import listProduct = require("script/controller/product/ListProductController");
import ProductServiceMock = require("script/service/mock/ProductServiceMock");
import AlertServiceMock = require("script/service/mock/AlertServiceMock");
import NavigatorServiceImpl = require("script/service/impl/NavigatorServiceImpl");

describe("controller: ListProductController", () => {

    var $scope: any;

    beforeEach(() => {
        module(($provide: ng.auto.IProvideService, $controllerProvider: ng.IControllerProvider)=>{
            $provide.service("ProductService", ProductServiceMock);
            $provide.service("AlertService", AlertServiceMock);
            $provide.service("$routeParams", () => {
                return { }
            });
            $provide.service("Progress", () => {
                return { start: () => {}, done: () => {}, set: () => {} }
            });
            $provide.service("NavigatorService", NavigatorServiceImpl);
            $controllerProvider.register("ListProductController", listProduct.ListProductController);
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
