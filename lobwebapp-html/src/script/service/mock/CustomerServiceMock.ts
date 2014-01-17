///<reference path="./../../reference.d.ts"/>

import a = require("./base/PersonServiceMock");

export module service.mock {
    export class CustomerServiceMock extends a.service.mock.base.PersonServiceMock<domain.Customer> implements d.service.contract.CustomerService {

        static $inject = ["$timeout"];
        constructor(public $timeout: ng.ITimeoutService) {
            super($timeout);

            this.addToRepository({ id: 1, name: "John Doe" });
            this.addToRepository({ id: 2, name: "Jane Doe" });
            this.addToRepository({ id: 3, name: "Jonnie Doe" });
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("CustomerService", service.mock.CustomerServiceMock);
};