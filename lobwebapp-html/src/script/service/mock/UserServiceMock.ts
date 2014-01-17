///<reference path="./../../reference.d.ts"/>

import a = require("./base/PersonServiceMock");

export module service.mock {
    export class UserServiceMock extends a.service.mock.base.PersonServiceMock<domain.User> implements d.service.contract.UserService {

        static $inject = ["$timeout"];
        constructor(public $timeout: ng.ITimeoutService) {
            super($timeout);

            this.addToRepository({ id: 1, username: "user", password: "password", roles: ["ROLE_USER"], name: "Lucas Espindola" });
        }

        findByUsername(username: string,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    var items = this.getRepository().filter(function (x: domain.User) {
                        return x.username.toLowerCase() == username.toLowerCase();
                    });
                    if (items.length !== 0) successCallback(items[0], 200, null, null);
                    else errorCallback(null, 404, null, null);
                }, 100);
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("UserService", service.mock.UserServiceMock);
};