///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../domain/base/AbstractEntity.ts'/>
///<reference path='./../../domain/User.ts'/>
///<reference path='./base/EntityService.ts'/>

import domain = require('./../../domain/User');
import service_contract_base = require('./base/EntityService');

export interface UserService extends service_contract_base.EntityService<domain.User>{
        
    findByUsername : (username : string,
        successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
        ) => void;
    	
}
