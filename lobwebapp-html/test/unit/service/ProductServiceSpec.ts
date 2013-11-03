///<reference path="./../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
declare module "script/service/mock/ProductServiceMock" { export = any }
import svc = require("script/service/mock/ProductServiceMock")

describe('ProductService', () => {
    beforeEach(() => {
        angular.module('lwa.service', []).service("ProductService", svc.service.mock.DefaultProductService);
        module('lwa.service');
    });

    it("should retrieve a list of groups with 2 items", inject((ProductService:d.service.contract.ProductService, $timeout: ng.ITimeoutService) => {
        var spy = jasmine.createSpy('list');
        ProductService.listGroups(spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0].length).toBe(2);
    }));

});