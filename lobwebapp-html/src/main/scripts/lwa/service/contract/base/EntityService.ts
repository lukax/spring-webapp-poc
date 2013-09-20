///<reference path='../../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='../../../domain/base/AbstractEntity.ts'/>

import domain_base = require('./../../../domain/base/AbstractEntity');

export interface EntityService<T extends domain_base.AbstractEntity>{
    	
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
