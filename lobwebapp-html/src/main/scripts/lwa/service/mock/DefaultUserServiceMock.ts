///<reference path="./../../reference.d.ts"/>
import a = require('./base/AbstractEntityServiceMock');

export module service.mock {
    export class DefaultUserService extends a.service.mock.base.AbstractEntityService<domain.User> implements d.service.contract.UserService {

        static $inject = ['$timeout'];
        constructor($timeout: ng.ITimeoutService) {
            super($timeout);
            super.getRepository().push({ id: 1, username: 'admin', password: '1234', role: '' });
            super.getRepository().push({ id: 2, username: 'manager', password: '1234', role: '' });
            super.getRepository().push({ id: 3, username: 'employee', password: '1234', role: '' });
            super.getRepository().push({ id: 4, username: 'client', password: '1234', role: '' });
        }


        findByUsername(username: string,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            var items = super.getRepository().filter(function (x: domain.User) {
                return x.username.toLowerCase() == username.toLowerCase();
            });
            if (items.length !== 0) successCallback(items[0], 200, null, null);
            else errorCallback(null, 404, null, null);
        }
    }
}