///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../domain/Product.ts'/>
///<reference path='./../contract/ProductService.ts'/>
///<reference path='./base/AbstractEntityService.ts'/>

import domain = require('./../../domain/Product');
import service_contract = require('./../contract/ProductService');
import service_impl_base = require('./base/AbstractEntityService');

export class DefaultProductService extends service_impl_base.AbstractEntityService<domain.Product> implements service_contract.ProductService {

    static $inject = ['$http'];
    constructor($http : ng.IHttpService){
        super('product', $http);
    }
        
    public findByName (name : string,
        successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
        errorCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
        {
        }                                   
    
    public listGroups (
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
            errorCallback: (data: string, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any)
        {   
        }
}