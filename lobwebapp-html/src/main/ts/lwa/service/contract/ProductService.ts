///<reference path='../../../DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../../domain/Product.ts'/>
///<reference path='base/EntityService.ts'/>

module lwa.service.contract{
    import domain = lwa.domain;
    import service = lwa.service;

    export interface ProductService extends service.contract.base.EntityService<domain.Product>{
        
        findByName : (name : string,
                successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any
                ) => void;
    
    }
}