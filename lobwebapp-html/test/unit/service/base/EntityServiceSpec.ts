///<reference path="../../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
///<amd-dependency path="underscore"/>
import svc = require("script/service/impl/base/EntityServiceImpl");

describe('service: EntityService', () => {
    beforeEach(() => {
        module(($provide: ng.auto.IProvideService) => {
            $provide.constant("contextUrl", "product");
            $provide.service("EntityService", <any>["contextUrl", "$http", svc.service.impl.base.EntityServiceImpl]);
        });
        
    });

    var sampleNewEntity: domain.base.AbstractEntity = { id: 0 };
    var sampleExistantEntity: domain.base.AbstractEntity = { id: 213121 };

    it("should retrieve a list of entity", inject((EntityService: d.service.contract.base.EntityService<domain.base.AbstractEntity>, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucSpy");
        var errSpy = jasmine.createSpy("errSpy");

        $httpBackend.expectGET("/api/product/").respond(200, []);
        EntityService.list(sucSpy, errSpy);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(sucSpy.mostRecentCall.args[0]).toEqual([]);
        expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
        expect(errSpy).not.toHaveBeenCalled();
    }));

    it("should save an entity", inject((EntityService: d.service.contract.base.EntityService<domain.base.AbstractEntity>, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucSpy"),
            errSpy = jasmine.createSpy("errSpy");
        var headers = { Location: "/api/product/" + sampleNewEntity.id, "Entity-Id": '' + sampleNewEntity.id };
        
        $httpBackend.expectPOST("/api/product/", sampleNewEntity).respond(201, null, headers);
        EntityService.save(sampleNewEntity, sucSpy, errSpy);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(sucSpy.mostRecentCall.args[1]).toEqual(201);
        expect(sucSpy.mostRecentCall.args[2]("Location")).toEqual(headers.Location);
        expect(sucSpy.mostRecentCall.args[2]("Entity-Id")).toEqual(headers["Entity-Id"]);
        expect(errSpy).not.toHaveBeenCalled();
    }));

    it("should update an entity", inject((EntityService: d.service.contract.base.EntityService<domain.base.AbstractEntity>, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucSpy"),
            errSpy = jasmine.createSpy("errSpy");

        $httpBackend.expectPUT("/api/product/" + sampleExistantEntity.id, sampleExistantEntity).respond(200, sampleExistantEntity);
        EntityService.update(sampleExistantEntity, sucSpy, errSpy);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
        expect(errSpy).not.toHaveBeenCalled();
    }));

    it("should remove an entity", inject((EntityService: d.service.contract.base.EntityService<domain.base.AbstractEntity>, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucSpy"),
            errSpy = jasmine.createSpy("errSpy");

        $httpBackend.expectDELETE("/api/product/" + sampleExistantEntity.id).respond(200);
        EntityService.remove(sampleExistantEntity, sucSpy, errSpy);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
        expect(errSpy).not.toHaveBeenCalled();
    }));

    it("should find an entity by id", inject((EntityService: d.service.contract.base.EntityService<domain.base.AbstractEntity>, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucSpy"),
            errSpy = jasmine.createSpy("errSpy");

        $httpBackend.expectGET("/api/product/" + sampleExistantEntity.id).respond(200, sampleExistantEntity);
        EntityService.find(sampleExistantEntity.id, sucSpy, errSpy);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
        expect(errSpy).not.toHaveBeenCalled();
    }));

    it("should check if contains an entity", inject((EntityService: d.service.contract.base.EntityService<domain.base.AbstractEntity>, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucSpy"),
            errSpy = jasmine.createSpy("errSpy");

        $httpBackend.expectGET("/api/product/" + sampleExistantEntity.id).respond(200, sampleExistantEntity);
        EntityService.exists(sampleExistantEntity, sucSpy, errSpy);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
        expect(errSpy).not.toHaveBeenCalled();
    }));

});