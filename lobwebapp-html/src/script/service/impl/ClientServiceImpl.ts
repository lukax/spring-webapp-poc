///<reference path="./../../reference.d.ts"/>
import i0 = require("./base/PersonServiceImpl");

export module service.impl {
    export class ClientServiceImpl extends i0.service.impl.base.PersonServiceImpl<domain.Client> implements d.service.contract.ClientService {

        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("client", $http);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("ClientService", service.impl.ClientServiceImpl);
};