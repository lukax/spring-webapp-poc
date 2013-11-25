///<reference path="./../../reference.d.ts"/>

import a = require("./base/PersonServiceMock");

export module service.mock {
    export class ClientServiceMock extends a.service.mock.base.PersonServiceMock<domain.Client> implements d.service.contract.ClientService {

        static $inject = ["$timeout", "_"];
        constructor(public $timeout: ng.ITimeoutService, public _: _<domain.Client>) {
            super($timeout, _);
            super.getRepository().push({ id: 1, firstName: "John", lastName: "Doe" });
            super.getRepository().push({ id: 2, firstName: "Jane", lastName: "Doe" });
            super.getRepository().push({ id: 3, firstName: "Jonnie", lastName: "Doe" });
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("ClientService", service.mock.ClientServiceMock);
};