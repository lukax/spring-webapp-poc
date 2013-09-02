///<reference path='../../../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../../../domain/base/AbstractEntity.ts'/>
///<reference path='../../contract/base/EntityService.ts'/>

module service.mock.base{
    export class AbstractEntityServiceMock<T extends domain.base.AbstractEntity> implements service.contract.base.EntityService<T> {
        private repository: T[];
        
        constructor(){
            this.repository = new Array<T>();
        }
        
        public save (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any)
                {
                    if(entity.id != 0) errorCallback('ID Inválido', 403, null, null);
                    var storId = 0;
                    this.getRepository().forEach(
                            (item)=>{
                                if(item.id > storId) storId = item.id;
                            });
                    entity.id = ++storId;
                    this.getRepository().push(angular.copy(entity));
                    
                    successCallback(storId, 200, null, null);
                }
                
        public update (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
                {
                    if(entity.id == 0) errorCallback('ID Inválido', 403, null, null);
                    var success = false;
                    this.getRepository().some(
                            (item, index) => {
                                if(item.id == entity.id){
                                    this.getRepository()[index] = angular.copy(entity);
                                    success = true;
                                    successCallback(null, 200, null, null);
                                    return true;
                            }
                    });
                    if(!success) errorCallback('ID inexistente', 404, null, null);
                }
             
        public remove (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any)
                {
                    var success = false;
                    this.getRepository().some(
                            (item, index) => {
                                if(item.id == entity.id){
                                    this.getRepository().splice(index, 1);
                                    success = true;
                                    successCallback(null, 200, null, null);
                                    return true;
                            }
                    });
                    if(!success) errorCallback('ID inexistente', 404, null, null);
                }
                
        public findById (id : number,
                successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any)
                {
                    var success = false;
                    this.getRepository().some(
                            (item) => {
                                if(item.id == id){
                                    success = true;
                                    successCallback(angular.copy(item), 200, null, null);
                                    return true; // Break the rest of the iteration
                                }
                    });
                    if(!success) errorCallback(null, 404, null, null) ;
                }
                
        public list (successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
                {
                    successCallback(angular.copy(this.getRepository()), 200, null, null);
                }
        
        
        public getRepository(){
            return this.repository;
        }
    }
}   