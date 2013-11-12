///<reference path="./../../../../reference.d.ts"/>
declare module "script/service/mock/base/EntityServiceMock" { export = any }
import svc = require("script/service/mock/base/EntityServiceMock");
import _ = require("underscore");

describe('service: EntityService', () => {
    beforeEach(() => {
        angular.module('lwa.service', [])
            .constant("_", _)
            .service("EntityService", svc.service.mock.base.EntityServiceMock);
        module('lwa.service');
    });

    it("should retrieve a list of entity", inject((EntityService:d.service.contract.base.EntityService, $timeout: ng.ITimeoutService) => {
        var spy = jasmine.createSpy('list');
        EntityService.list(spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0]).toEqual(jasmine.any(Array));
    }));

    it("should save an entity", inject((EntityService:d.service.contract.base.EntityService<domain.base.AbstractEntity>, $timeout: ng.ITimeoutService) => {
        var spy = jasmine.createSpy('entity');
        EntityService.save({id: 0}, spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0]).toEqual(jasmine.any(Object));
        expect(spy.mostRecentCall.args[0].id).toBe(1);
    }));

    it("should update an entity", inject((EntityService:d.service.contract.base.EntityService<domain.base.AbstractEntity>, $timeout: ng.ITimeoutService) => {
        var spy = jasmine.createSpy('entity');
        EntityService.save({id: 0}, ()=>{}, ()=>{});
        $timeout.flush();
        EntityService.update({id: 1}, spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0]).toEqual(jasmine.any(Object));
        expect(spy.mostRecentCall.args[0].id).toBe(1);
    }));

    it("should remove an entity", inject((EntityService:d.service.contract.base.EntityService<domain.base.AbstractEntity>, $timeout: ng.ITimeoutService) => {
        EntityService.save({id:0}, ()=>{}, ()=>{});
        $timeout.flush();
        var spy = jasmine.createSpy('entity');
        EntityService.remove({id: 1}, spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0]).toEqual(jasmine.any(Object));
        expect(spy.mostRecentCall.args[0].id).toBe(1);
        var spy2 = jasmine.createSpy('list');
        EntityService.list(spy2, spy2);
        $timeout.flush();
        expect(spy2.mostRecentCall.args[0]).not.toContain({id: 1});
    }));

    it("should find an entity by id", inject((EntityService:d.service.contract.base.EntityService<domain.base.AbstractEntity>, $timeout: ng.ITimeoutService) => {
        EntityService.save({id:0}, ()=>{}, ()=> {});
        $timeout.flush();
        var spy = jasmine.createSpy('entity');
        EntityService.find(1, spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0]).toEqual(jasmine.any(Object));
        expect(spy.mostRecentCall.args[0].id).toBe(1);
    }));

    it("should check if contains an entity", inject((EntityService:d.service.contract.base.EntityService<domain.base.AbstractEntity>, $timeout: ng.ITimeoutService) => {
        EntityService.save({id: 0}, ()=>{}, ()=>{});
        $timeout.flush();
        var spy = jasmine.createSpy('entity');
        EntityService.contains({id: 1}, spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0]).toBeTruthy();
    }));

});