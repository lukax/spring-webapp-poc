///<reference path="./../../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
import i0 = require("script/service/mock/AuthServiceMock");
import i1 = require("script/service/mock/UserServiceMock");
import _ = require("underscore");

describe("service: AuthService", () => {
    beforeEach(() => {
        angular.module("app",[])
            .constant("_", _)
            .service("UserService", i1.service.mock.UserServiceMock)
            .service("AuthService", i0.service.mock.AuthServiceMock)
        ;
        module("app");
    });

    it("should login an user", (inject((AuthService: d.service.contract.AuthService, $timeout: ng.ITimeoutService, UserService:d.service.contract.UserService) => {
        UserService.save(<domain.User>{id: 0, username: "user 1", password: "123456", isLogged: false}, ()=> {}, ()=> {});
        $timeout.flush();
    	var spy = jasmine.createSpy("login");
    	AuthService.login(<domain.User>{username: "user 1", password: "123456"}, spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0].username).toBe("user 1");
        expect(AuthService.isLoggedIn()).toBeTruthy();
        expect(AuthService.currentUser().username).toEqual("user 1");
        expect(AuthService.currentUser().password).toEqual("123456");
	})));

    it("should logout an user", (inject((AuthService: d.service.contract.AuthService, $timeout: ng.ITimeoutService, UserService:d.service.contract.UserService) => {
        UserService.save(<domain.User>{id: 0, username: "user 1", password: "123456", isLogged: true}, ()=> {}, ()=> {});
        $timeout.flush();
        var spy = jasmine.createSpy("logout");
        AuthService.logout(<domain.User>{username: "user 1", password: "123456"}, spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0].username).toBe("user 1");
        expect(AuthService.isLoggedIn()).toBeFalsy();
    })));


});