///<reference path='../../../DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../../domain/Product.ts'/>
///<reference path='../contract/ProductService.ts'/>
///<reference path='base/AbstractEntityService.ts'/>

module lwa.service.impl{
    import domain = lwa.domain;
    import service = lwa.service;
    
	export class DefaultProductService extends service.impl.base.AbstractEntityService<domain.Product> implements service.contract.ProductService {
        
        constructor($http : ng.IHttpService){
            super('product', $http);
        }
        
        public findByName (name : string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
            errorCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
            {
            }                                   
       
        
    }
}