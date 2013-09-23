///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../domain/base/AbstractEntity.ts'/>
///<reference path='./../../domain/Product.ts'/>
///<reference path='./../contract/base/EntityService.ts'/>
///<reference path='./../contract/ProductService.ts'/>
///<reference path='./base/AbstractEntityService.ts'/>

import domain = require('./../../domain/User');
import service_mock = require('./base/AbstractEntityService');
import service_contract = require('./../contract/UserService');

export class DefaultUserService extends service_mock.AbstractEntityService<domain.User> implements service_contract.UserService {

    static $inject = ['$timeout'];
    constructor($timeout: ng.ITimeoutService){
        super($timeout);
        super.getRepository().push(new domain.User(1,'admin', '1234', domain.UserRole.admin));
        super.getRepository().push(new domain.User(2,'manager', '1234', domain.UserRole.manager));
        super.getRepository().push(new domain.User(3,'employee', '1234', domain.UserRole.employee));
        super.getRepository().push(new domain.User(4, 'client', '1234', domain.UserRole.client));
    }
        
        
    findByUsername (username : string,
        successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any)
    {
        var items = super.getRepository().filter(function(x: domain.User){
            return x.username.toLowerCase() == username.toLowerCase();
        });
        if(items.length !== 0) successCallback(items[0], 200, null, null);
        else errorCallback(null, 404, null, null);
    }
}
