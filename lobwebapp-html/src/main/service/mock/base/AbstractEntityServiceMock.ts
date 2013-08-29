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
                    this.getRepository().push(entity);
                }
                
        public update (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
                {
                    this.getRepository().forEach(function(item, index){
                        if(item.id == entity.id){
                            this.getRepository()[index] = entity;
                            return;
                        }
                    });
                
                }
             
        public remove (entity: T, 
                successCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any)
                {
                    this.getRepository().forEach(function(item, index){
                        if(item.id == entity.id){
                            this.getRepository().splice(index, 1);
                        }
                    });
                
                }
                
        public findById (id : number,
                successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any)
                {
                    this.getRepository().forEach(function(item){
                        if(item.id == id){
                            successCallback(item, 200, null, null);
                            return;
                        }
                    });
                
                }
                
        public list (successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
                errorCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
                {
                    successCallback(this.getRepository(), 200, null, null);
                }
        
        
        public getRepository(){
            return this.repository;
        }
    }
}   