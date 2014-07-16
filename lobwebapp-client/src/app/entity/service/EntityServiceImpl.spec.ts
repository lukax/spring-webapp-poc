///<reference path="../../reference.ts"/>

describe('service: EntityService', () => {

  var apiUrl:string = "/api/v1/entity";
  var sampleNewEntity:entity.AbstractEntity = { id: 0 };
  var sampleExistantEntity:entity.AbstractEntity = { id: 213121 };

  beforeEach(() => {
    module(($provide:ng.auto.IProvideService) => {
      $provide.constant("apiUrl", apiUrl);
      $provide.service("EntityService", entity.EntityServiceImpl);
    });

  });

  it("should retrieve a list of entity", inject((EntityService:entity.EntityService<entity.AbstractEntity>, $httpBackend:ng.IHttpBackendService) => {
    var sucSpy = jasmine.createSpy("sucSpy");
    var errSpy = jasmine.createSpy("errSpy");

    $httpBackend.expectGET(apiUrl).respond(200, []);
    EntityService.list(sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[0]).toEqual([]);
    expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
    expect(errSpy).not.toHaveBeenCalled();
  }));

  it("should save an entity", inject((EntityService:entity.EntityService<entity.AbstractEntity>, $httpBackend:ng.IHttpBackendService) => {
    var sucSpy = jasmine.createSpy("sucSpy"),
      errSpy = jasmine.createSpy("errSpy");
    var headers = { Location: apiUrl + "/" + sampleNewEntity.id, "Entity-Id": '' + sampleNewEntity.id };

    $httpBackend.expectPOST(apiUrl, sampleNewEntity).respond(201, null, headers);
    EntityService.save(sampleNewEntity, sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[1]).toEqual(201);
    expect(sucSpy.mostRecentCall.args[2]("Location")).toEqual(headers.Location);
    expect(sucSpy.mostRecentCall.args[2]("Entity-Id")).toEqual(headers["Entity-Id"]);
    expect(errSpy).not.toHaveBeenCalled();
  }));

  it("should update an entity", inject((EntityService:entity.EntityService<entity.AbstractEntity>, $httpBackend:ng.IHttpBackendService) => {
    var sucSpy = jasmine.createSpy("sucSpy"),
      errSpy = jasmine.createSpy("errSpy");

    $httpBackend.expectPUT(apiUrl + "/" + sampleExistantEntity.id, sampleExistantEntity).respond(200, sampleExistantEntity);
    EntityService.update(sampleExistantEntity, sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
    expect(errSpy).not.toHaveBeenCalled();
  }));

  it("should remove an entity", inject((EntityService:entity.EntityService<entity.AbstractEntity>, $httpBackend:ng.IHttpBackendService) => {
    var sucSpy = jasmine.createSpy("sucSpy"),
      errSpy = jasmine.createSpy("errSpy");

    $httpBackend.expectDELETE(apiUrl + "/" + sampleExistantEntity.id).respond(200);
    EntityService.remove(sampleExistantEntity, sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
    expect(errSpy).not.toHaveBeenCalled();
  }));

  it("should find an entity by id", inject((EntityService:entity.EntityService<entity.AbstractEntity>, $httpBackend:ng.IHttpBackendService) => {
    var sucSpy = jasmine.createSpy("sucSpy"),
      errSpy = jasmine.createSpy("errSpy");

    $httpBackend.expectGET(apiUrl + "/" + sampleExistantEntity.id).respond(200, sampleExistantEntity);
    EntityService.find(sampleExistantEntity.id, sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
    expect(errSpy).not.toHaveBeenCalled();
  }));

  it("should check if contains an entity", inject((EntityService:entity.EntityService<entity.AbstractEntity>, $httpBackend:ng.IHttpBackendService) => {
    var sucSpy = jasmine.createSpy("sucSpy"),
      errSpy = jasmine.createSpy("errSpy");

    $httpBackend.expectGET(apiUrl + "/" + sampleExistantEntity.id).respond(200, sampleExistantEntity);
    EntityService.exists(sampleExistantEntity, sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
    expect(errSpy).not.toHaveBeenCalled();
  }));

});
