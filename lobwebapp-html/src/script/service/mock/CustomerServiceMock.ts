///<reference path="./../../reference.d.ts"/>

import a = require("./base/PersonServiceMock");

export module service.mock {
    export class CustomerServiceMock extends a.service.mock.base.PersonServiceMock<domain.Customer> implements d.service.contract.CustomerService {

        static $inject = ["$timeout", "_"];
        constructor(public $timeout: ng.ITimeoutService, public _: _<domain.Customer>) {
            super($timeout, _);
            super.getRepository().push({ id: 1, firstName: "John", lastName: "Doe" });
            super.getRepository().push({ id: 2, firstName: "Jane", lastName: "Doe" });
            super.getRepository().push({ id: 3, firstName: "Jonnie", lastName: "Doe" });
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("CustomerService", service.mock.CustomerServiceMock);
};