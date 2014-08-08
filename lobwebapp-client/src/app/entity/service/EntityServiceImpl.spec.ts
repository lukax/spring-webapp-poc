///<reference path="../../reference.ts"/>

describe('service: EntityService', () => {
  var sucSpy:jasmine.Spy;
  var errSpy:jasmine.Spy;
  var sampleNewEntity:entity.AbstractEntity = { id: 0 };
  var sampleExistantEntity:entity.AbstractEntity = { id: 213121 };
  var apiUrl:string = "/api/v1/entity";
  var EntityService:entity.EntityService<entity.AbstractEntity>;
  var $httpBackend:ng.IHttpBackendService;

  beforeEach(module("lwa.entity", ($provide:ng.auto.IProvideService) => {
    $provide.value("apiUrl", apiUrl);
  }));
  beforeEach(inject((_EntityService_:entity.EntityService<entity.AbstractEntity>, _$httpBackend_:ng.IHttpBackendService) => {
    EntityService = _EntityService_;
    $httpBackend = _$httpBackend_;
    sucSpy = jasmine.createSpy("sucSpy");
    errSpy = jasmine.createSpy("errSpy")
  }));

  it("should retrieve a list of entity", () => {
    $httpBackend.expectGET(apiUrl).respond(200, []);
    EntityService.list(sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[0]).toEqual([]);
    expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
    expect(errSpy).not.toHaveBeenCalled();
  });

  it("should save an entity", () => {
    var headers = { Location: apiUrl + "/" + sampleNewEntity.id, "Entity-Id": '' + sampleNewEntity.id };
    $httpBackend.expectPOST(apiUrl, sampleNewEntity).respond(201, null, headers);
    EntityService.save(sampleNewEntity, sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[1]).toEqual(201);
    expect(sucSpy.mostRecentCall.args[2]("Location")).toEqual(headers.Location);
    expect(sucSpy.mostRecentCall.args[2]("Entity-Id")).toEqual(headers["Entity-Id"]);
    expect(errSpy).not.toHaveBeenCalled();
  });

  it("should update an entity", () => {
    $httpBackend.expectPUT(apiUrl + "/" + sampleExistantEntity.id, sampleExistantEntity).respond(200, sampleExistantEntity);
    EntityService.update(sampleExistantEntity, sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
    expect(errSpy).not.toHaveBeenCalled();
  });

  it("should remove an entity", () => {
    $httpBackend.expectDELETE(apiUrl + "/" + sampleExistantEntity.id).respond(200);
    EntityService.remove(sampleExistantEntity, sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
    expect(errSpy).not.toHaveBeenCalled();
  });

  it("should find an entity by id", () => {
    $httpBackend.expectGET(apiUrl + "/" + sampleExistantEntity.id).respond(200, sampleExistantEntity);
    EntityService.find(sampleExistantEntity.id, sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
    expect(errSpy).not.toHaveBeenCalled();
  });

  it("should check if contains an entity", () => {
    $httpBackend.expectGET(apiUrl + "/" + sampleExistantEntity.id).respond(200, sampleExistantEntity);
    EntityService.exists(sampleExistantEntity, sucSpy, errSpy);
    $httpBackend.flush();

    expect(sucSpy).toHaveBeenCalled();
    expect(sucSpy.mostRecentCall.args[1]).toEqual(200);
    expect(errSpy).not.toHaveBeenCalled();
  });
});
