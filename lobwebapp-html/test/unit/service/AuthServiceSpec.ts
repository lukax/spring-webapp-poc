///<reference path="./../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
///<amd-dependency path="underscore"/>
import i0 = require("script/service/impl/AuthServiceImpl");
import i1 = require("script/service/impl/UserServiceImpl");

describe("service: AuthService", () => {
    beforeEach(() => {
        module(($provide: ng.auto.IProvideService) => {
            $provide.service("AuthService", i0.service.impl.AuthServiceImpl);
        });
    });

    var sampleUser: domain.User = { id: 1, name: "John Metallation", username: "orion", password: "masterofpuppets" };
    var sampleAuthToken: domain.AuthToken = { access_token: "xx", token_type: "Bearer", refresh_token: "yy", expires_in: new Date("2015").getTime() };

    it("should login an user", (inject((AuthService: d.service.contract.AuthService, $httpBackend: ng.IHttpBackendService) => {
        var sucSpy = jasmine.createSpy("sucLogin"),
            errSpy = jasmine.createSpy("errLogin");

        $httpBackend.expectGET(new RegExp("/api/oauth/token")).respond(200, sampleAuthToken);
        AuthService.login(sampleUser, sucSpy, errSpy);
        $httpBackend.flush();

        expect(sucSpy).toHaveBeenCalled();
        expect(sucSpy.calls.length).toBe(1);
        expect(AuthService.isLoggedIn()).toBeTruthy();
        expect(errSpy).not.toHaveBeenCalled();
	})));

    it("should logout an user", (inject((AuthService: d.service.contract.AuthService) => {
        AuthService.getUser = () => {
            return sampleUser;
        };
        var sucSpy = jasmine.createSpy("sucLogout"),
            errSpy = jasmine.createSpy("errLogout");

        AuthService.logout(sucSpy, errSpy);

        expect(sucSpy).toHaveBeenCalled();
        expect(AuthService.isLoggedIn()).toBeFalsy();
        expect(errSpy).not.toHaveBeenCalled();
    })));

});