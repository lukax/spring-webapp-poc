///<reference path="../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
///<amd-dependency path="underscore"/>
import UserServiceImpl = require("script/service/impl/UserServiceImpl");
import $ = require("jquery");

describe("service: UserService", () => {
    beforeEach(() => {
        module(($provide: ng.auto.IProvideService) => {
            $provide.service("UserService", UserServiceImpl);
        });
    });

    var contextUrl: string = "/api/v1/user";
    var sampleUser: domain.User = { id: 1, name: "John Metallation", username: "orion", password: "masterofpuppets", roles: [] };

    it("should find a user by username", (inject((UserService: service.contract.UserService, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucUser"),
            errSpy = jasmine.createSpy("errUser");
        var params = { username: "%" + sampleUser.username + "%" }; 
        var url = contextUrl + "?" + $.param(params);

        $httpBackend.expectGET(url, {
            Accept: "application/json, text/plain, */*"
        }).respond(200, sampleUser);
        UserService.findByUsername(sampleUser.username, sucSpy, errSpy);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(errSpy).not.toHaveBeenCalled();
    })));
});