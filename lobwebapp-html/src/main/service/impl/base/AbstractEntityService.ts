///<reference path='../../../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../../../domain/base/AbstractEntity.ts'/>
///<reference path='../../contract/base/EntityService.ts'/>

module service.impl.base{
    export class AbstractEntityService<T extends domain.base.AbstractEntity> implements service.contract.base.EntityService<T> {
        
        private rootUrl : string = "http://localhost:8080/lobwebapp-core/rest";
        private http : ng.IHttpService;
        
        constructor(contextUrl: string, $http: ng.IHttpService){
            this.rootUrl += '/' + contextUrl;
            this.http = $http;
        }
        
        public save (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any)
                {
                    this.getHttp().post(this.rootUrl, entity).success(successCallback).error(errorCallback);
                }
                
        public update (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
                {
                    this.getHttp().put(this.rootUrl, entity).success(successCallback).error(errorCallback);
                }
             
        public remove (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any)
                {
                    this.getHttp().delete(this.rootUrl, entity).success(successCallback).error(errorCallback);
                }
                
        public findById (id : number,
                successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any)
                {
                    this.getHttp().get(this.rootUrl + '/'+ id).success(successCallback).error(errorCallback);
                }
                
        public list (successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
                {
                    this.getHttp().get(this.rootUrl).success(successCallback).error(errorCallback);   
                }
        
        
        public getHttp() {
            return this.http;
        }
       
    }
}   