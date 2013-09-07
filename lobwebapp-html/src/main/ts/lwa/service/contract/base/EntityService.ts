///<reference path='../../../../DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../../../domain/base/AbstractEntity.ts'/>

module lwa.service.contract.base{
    import domain = lwa.domain;

    export interface EntityService<T extends domain.base.AbstractEntity>{
    	
        save : (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any
                ) => void;
    
        update : (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any
                ) => void;
                
        remove : (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any
                ) => void;
                
        findById : (id : number,
                successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any
                ) => void;
                
        list : (successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any
                ) => void;        
        
    }
}