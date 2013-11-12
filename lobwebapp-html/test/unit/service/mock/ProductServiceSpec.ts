///<reference path="./../../../reference.d.ts"/>
import i0 = require("script/service/mock/ProductServiceMock")
import _ = require("underscore");

describe('service: ProductService', () => {
    beforeEach(() => {
        angular.module('lwa.service', [])
            .constant("_", _)
            .service("ProductService", i0.service.mock.ProductServiceMock);
        module('lwa.service');
    });

    it("should retrieve a list of groups", inject((ProductService:d.service.contract.ProductService, $timeout: ng.ITimeoutService) => {
        var spy = jasmine.createSpy('list');
        ProductService.listGroups(spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0]).toEqual(jasmine.any(Array));
    }));

    it("should find by name", inject((ProductService:d.service.contract.ProductService, $timeout: ng.ITimeoutService) => {
        ProductService.save(<domain.Product>{id: 0, name: "product 1"},()=> {}, ()=>{});
        $timeout.flush();
        var spy = jasmine.createSpy('list');
        ProductService.findByName("product 1", spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0]).toEqual(jasmine.any(Array));
        expect(spy.mostRecentCall.args[0][0].name).toBe("product 1");
    }));

});