///<reference path="../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
///<amd-dependency path="underscore"/>
import i0 = require("script/controller/product/ListProductController");
import i1 = require("script/service/mock/ProductServiceMock");
import i2 = require("script/service/mock/AlertServiceMock");
import i3 = require("script/util/Navigator");
import i4 = require("script/modularity/ControllerModule");

describe("controller: ListProductController", () => {

    var $scope: any;

    beforeEach(() => {
        module(($provide: ng.auto.IProvideService, $controllerProvider: ng.IControllerProvider)=>{
            $provide.service("ProductService", i1.service.mock.ProductServiceMock);
            $provide.service("AlertService", i2.service.mock.AlertServiceMock);
            $provide.service("$stateParams", () => {
                return { }
            });
            $provide.service("Progress", () => {
                return { start: () => {}, done: () => {}, set: () => {} }
            });
            $provide.service("Navigator", i3.util.Navigator);
            $controllerProvider.register("ProductController", i0.controller.product.ListProductController);
        });
        inject(($rootScope: ng.IRootScopeService, Navigator)=> {
            $scope = $rootScope.$new();
            $scope.navigator = Navigator;
        });
    });

    it("should list products", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService, $stateParams: any) => {
        $stateParams.search = "";
        var ctrl = $controller("ProductController", {
            $scope: $scope
        });

        ctrl.listProduct(0);
        $timeout.flush();
        expect($scope.entities).toEqual(jasmine.any(Array));
    }));

    it("should edit a product", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService, $location: ng.ILocationService) => {
        var ctrl = $controller("ProductController", {
            $scope: $scope
        });

        ctrl.editEntity(0);
        $timeout.flush();
        expect($location.path()).toBe("/product/0");
    }));

    xit("should get searchText from url Params", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService, $stateParams: any) => {
        $stateParams.search = "SSD";
        var ctrl = $controller("ProductController", {
            $scope: $scope
        });

        $timeout.flush();
        expect($scope.searchText).toBe("SSD");
    }))
});
