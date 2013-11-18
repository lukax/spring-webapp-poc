///<reference path="./../../reference.d.ts"/>

import a = require("./base/PersonServiceMock");

export module service.mock {
    export class UserServiceMock extends a.service.mock.base.PersonServiceMock<domain.User> implements d.service.contract.UserService {

        static $inject = ["$timeout", "_"];
        constructor(public $timeout: ng.ITimeoutService, public _: _<domain.User>) {
            super($timeout, _);
            super.getRepository().push({ id: 1, username: "admin", password: "1234", roles: [], firstName: "Lucas", lastName: "Espindola" });
            super.getRepository().push({ id: 2, username: "manager", password: "1234", roles: [], firstName: "Viktor", lastName: "Pinto" });
            super.getRepository().push({ id: 3, username: "employee", password: "1234", roles: [], firstName: "Vinicius", lastName: "Pinto" });
            super.getRepository().push({ id: 4, username: "client", password: "1234", roles: [], firstName: "Lucas", lastName: "Minezes" });
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