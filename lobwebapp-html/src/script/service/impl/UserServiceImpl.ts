///<reference path="./../../reference.d.ts"/>
import i0 = require('./base/PersonServiceImpl');

export module service.impl {
    export class UserServiceImpl extends i0.service.impl.base.PersonServiceImpl<domain.User> implements d.service.contract.UserService {
        
        static $inject = ['$http'];
        constructor($http: ng.IHttpService) {
            super("user", $http);
        }

        findByUsername(username: string,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            
        }
    }
}