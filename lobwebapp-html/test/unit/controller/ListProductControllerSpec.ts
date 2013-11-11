///<reference path="./../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
import i0 = require("script/controller/product/ListProductController");
import i1 = require("script/service/mock/ProductServiceMock");
import i2 = require("script/service/mock/util/AlertServiceMock");
import i3 = require("script/service/impl/util/NavigationServiceImpl");
import i4 = require("script/modularity/ControllerModule");

describe("controller: ListProductController", () => {
    new i4.modularity.ControllerModule();
    var $scope: any;
    beforeEach(() => {
        module("lwa.service", ($provide: ng.auto.IProvideService, $controllerProvider: ng.IControllerProvider)=>{
            $provide.service("ProductService", i1.service.mock.ProductServiceMock);
            $provide.service("AlertService", i2.service.mock.util.AlertServiceMock);
            $provide.service("NavigationService", i3.service.impl.util.NavigationServiceImpl);
            $provide.service("$stateParams", () => {
                return { }
            });
            $controllerProvider.register("ProductController", i0.controller.product.ListProductController);
        });
        inject(($rootScope: ng.IRootScopeService)=> {
           $scope = $rootScope.$new();
        });
    });

    it("should list products", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService) => {
        var ctrl = $controller("ProductController", {
            $scope: $scope
        });
        ctrl.listProduct();
        $timeout.flush();
        expect($scope.products).toEqual(jasmine.any(Array));
    }));

    it("should edit a product", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService, $location: ng.ILocationService) => {
        var ctrl = $controller("ProductController", {
            $scope: $scope
        });
        $timeout.flush();
        ctrl.editProduct(0);
        $timeout.flush();
        expect($location.path()).toBe("/product/0");
    }));

    it("should get searchText from url Params", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService, NavigationService:d.service.contract.util.NavigationService) => {
        var text = "SSD";
        spyOn(NavigationService, "params").andReturn({ search: text });
        var ctrl = $controller("ProductController", {
            $scope: $scope,
            NavigationService: NavigationService
        });
        $timeout.flush();
        expect($scope.searchText).toBe(text);
    }))
});
