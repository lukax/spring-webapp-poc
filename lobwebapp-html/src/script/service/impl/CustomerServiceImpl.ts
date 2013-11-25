///<reference path="./../../reference.d.ts"/>
import i0 = require("./base/PersonServiceImpl");

export module service.impl {
    export class CustomerServiceImpl extends i0.service.impl.base.PersonServiceImpl<domain.Customer> implements d.service.contract.CustomerService {

        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("customer", $http);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("CustomerService", service.impl.CustomerServiceImpl);
};