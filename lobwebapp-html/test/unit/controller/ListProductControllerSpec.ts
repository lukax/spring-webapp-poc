///<reference path="./../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
declare module "script/controller/product/ListProductController" { export = any }
declare module "script/service/mock/ProductServiceMock" { export = any }
declare module "script/service/mock/util/AlertServiceMock" { export = any }
declare module "script/service/impl/util/NavigationServiceImpl" { export = any }
declare module "script/modularity/ControllerModule" { export = any }
import a = require("script/controller/product/ListProductController");
import b = require("script/service/mock/ProductServiceMock");
import c = require("script/service/mock/util/AlertServiceMock");
import e = require("underscore");
import f = require("script/service/impl/util/NavigationServiceImpl");
import z = require("script/modularity/ControllerModule");

describe("controller: ListProductController", () => {
    new z.modularity.ControllerModule();
    var scope: any;
    beforeEach(() => {
        module("lwa.service", ($provide: ng.auto.IProvideService, $controllerProvider: ng.IControllerProvider)=>{
            $provide.service("ProductService", b.service.mock.ProductServiceMock);
            $provide.service("AlertService", c.service.mock.util.AlertServiceMock);
            $provide.service("NavigationService", f.service.impl.util.NavigationServiceImpl);
            $provide.service("$stateParams", () => {
                return { }
            });
            $controllerProvider.register("ProductController", a.controller.product.ListProductController);
        });
        inject(($rootScope: ng.IRootScopeService)=> {
           scope = $rootScope.$new();
        });
    });

    it("should list products", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService) => {
        var ctrl = $controller("ProductController", {
            $scope: scope
        });
        ctrl.listProduct();
        $timeout.flush();
        expect(scope.products).toEqual(jasmine.any(Array));
    }));

    it("should edit a product", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService, $location: ng.ILocationService) => {
        var ctrl = $controller("ProductController", {
            $scope: scope
        });
        $timeout.flush();
        ctrl.editProduct(0);
        $timeout.flush();
        expect($location.path()).toBe("/product/0");
    }));

    it("should get searchText from url Params", inject(($controller: ng.IControllerService, $timeout: ng.ITimeoutService, NavigationService:d.service.contract.util.NavigationService) => {
        var text = "SSD";
        spyOn(NavigationService, "urlParams").andCallFake(()=> {
            console.log("yeajh");
        });
        var ctrl = $controller("ProductController", {
            $scope: scope,
            NavigationService: NavigationService
        });
        $timeout.flush();
        expect(NavigationService.urlParams.calls.length).toBe(1);
        expect(ctrl.searchText).toBe(text);
    }))
});
