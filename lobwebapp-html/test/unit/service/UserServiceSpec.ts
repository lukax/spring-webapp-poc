///<reference path="./../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
///<amd-dependency path="underscore"/>
import i0 = require("script/service/impl/UserServiceImpl");

describe("service: UserService", () => {
    beforeEach(() => {
        module(($provide: ng.auto.IProvideService) => {
            $provide.service("UserService", i0.service.impl.UserServiceImpl);
        });
    });

    var sampleUser: domain.User = { id: 1, name: "John Metallation", username: "orion", password: "masterofpuppets" };

    it("should find a user by username", (inject((UserService: d.service.contract.UserService, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucUser"),
            errSpy = jasmine.createSpy("errUser");
        var header = "%" + sampleUser.username + "%"; 

        $httpBackend.expectGET("/api/user/", { user_username: header, Accept: "application/json, text/plain, */*" }).respond(200, sampleUser);
        UserService.findByUsername(sampleUser.username, sucSpy, errSpy);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(errSpy).not.toHaveBeenCalled();
    })));
});