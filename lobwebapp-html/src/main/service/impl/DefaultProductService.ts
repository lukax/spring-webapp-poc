///<reference path='../../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../../domain/Product.ts'/>
///<reference path='../contract/ProductService.ts'/>
///<reference path='base/AbstractEntityService.ts'/>

module service.impl{
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