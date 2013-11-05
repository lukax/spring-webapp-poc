///<reference path="./../../../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularMocks"/>
declare module "script/service/mock/UserServiceMock" { export = any }
import b = require("script/service/mock/UserServiceMock");
import _ = require("underscore");

describe("service: UserService", () => {
    beforeEach(() => {
        angular.module("app",[])
            .constant("_", _)
            .service("UserService", b.service.mock.UserServiceMock)
        ;
        module("app");
    });

    it("should find a user by username", (inject(($timeout: ng.ITimeoutService, UserService:d.service.contract.UserService) => {
        UserService.save(<domain.User>{id: 0, username: "user 1", password: "123456"}, ()=> {}, ()=> {});
        $timeout.flush();
        var spy = jasmine.createSpy("user");
        UserService.findByUsername("user 1", spy, spy);
        expect(spy).not.toHaveBeenCalled();
        $timeout.flush();
        expect(spy.calls.length).toBe(1);
        expect(spy.mostRecentCall.args[0].username).toBe("user 1");
    })));
});