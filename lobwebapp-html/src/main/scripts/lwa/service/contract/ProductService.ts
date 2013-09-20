///<reference path='../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='../../domain/base/AbstractEntity.ts'/>
///<reference path='../../domain/Product.ts'/>
///<reference path='base/EntityService.ts'/>

import domain = require('./../../domain/Product');
import service_contract_base = require('./base/EntityService');

export interface ProductService extends service_contract_base.EntityService<domain.Product>{
        
    findByName : (name : string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
            errorCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ) => void;
    	
    // listGroups : (
    //        successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
    //        errorCallback: (data: string, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
    //        ) => void;
        
}
