///<reference path='../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='../../domain/base/AbstractEntity.ts'/>
///<reference path='../../domain/Product.ts'/>
///<reference path='../contract/base/EntityService.ts'/>
///<reference path='../contract/ProductService.ts'/>
///<reference path='base/AbstractEntityServiceMock.ts'/>

import domain = require('./../../domain/Product');
import service_mock = require('./base/AbstractEntityServiceMock');
import service_contract = require('./../contract/ProductService');

export class DefaultProductServiceMock extends service_mock.AbstractEntityServiceMock<domain.Product> implements service_contract.ProductService {
        
    constructor($timeout: ng.ITimeoutService){
        super($timeout);
        super.getRepository().push(new domain.Product(1,'Notebook', 'Dell Inspiron 15R Special Edition Intel Core i5-3230M 2.6 GHz 6144 MB 750 GB', 9, 2102.30, 2699.00, 'Informática/Dispositivos', 0));
        super.getRepository().push(new domain.Product(2,'Notebook', 'Acer Aspire E1-471-6413 Intel Core i3-2328M 2.2 GHz 6144 MB 500 GB', 13, 976.00, 1407.12, 'Informática/Dispositivos', 0));
        super.getRepository().push(new domain.Product(3, 'Memória', 'Kingston KVR1333D3N9 8192 MB PC DDR3 1333 MHz', 34, 76.34, 143.75, 'Informática/Componentes', 0));
        super.getRepository().push(new domain.Product(4, 'Memória', 'Markvision KMM2GBD3-1333 2048 MB PC DDR3 1333 MHz', 27, 27.32, 25.10, 'Informática/Componentes', 0));
        super.getRepository().push(new domain.Product(5, 'SSD', 'Kingston SSDNow E100 SE100S37 100 GB Interno', 6, 1035.00, 1388.82, 'Informática/Componentes', 0));
    }
        
        
    public findByName (name : string,
        successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
        errorCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
        {
            var items = super.getRepository().filter(function(element){
                return element.name.toLowerCase() == name.toLowerCase();
            });
            if(items.length !== 0) successCallback(items, 200, null, null);
            else errorCallback(null, 404, null, null);
        }        
            
    public listGroups (
        successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
        errorCallback: (data: string, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any)
        {
            var groups = [];
            super.getRepository().forEach((item) => {
                if(groups.indexOf(item.group) === -1) groups.push(item.group);
            });
            if(groups.length > 0) successCallback(groups, 200, null, null);
            else errorCallback(null, 404, null, null);
        }  
}
