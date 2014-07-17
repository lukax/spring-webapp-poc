///<reference path="../../reference.d.ts"/>
import i0 = require("./base/PersonServiceImpl");

export module service.impl {
    export class CustomerServiceImpl extends i0.service.impl.base.PersonServiceImpl<domain.Customer> 
        implements d.service.contract.CustomerService, d.service.contract.base.HasDefaultValue<domain.Customer> {

        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("customer", $http, this);
        }

        getDefault(): domain.Customer {
            return { id: 0, name: "" };
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("CustomerService", service.impl.CustomerServiceImpl);
};