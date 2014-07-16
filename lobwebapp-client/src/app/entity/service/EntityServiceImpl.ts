///<reference path="../../reference.ts"/>

module entity {
  export class EntityServiceImpl<T extends AbstractEntity> implements EntityService<T> {

    static $inject = ["$http", "apiUrl"];
    constructor(public $http:ng.IHttpService,
                public apiUrl: string) {
    }

    save(entity:T, successCallback:(data:T, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, errorCallback:(data:MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.$http({method: "POST",
        url: this.apiUrl,
        data: entity})
        .success(successCallback)
        .error(errorCallback);
    }

    update(entity:T, successCallback:(data:T, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, errorCallback:(data:MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.$http({method: "PUT",
        url: this.apiUrl + "/" + entity.id,
        data: entity})
        .success(successCallback)
        .error(errorCallback);
    }

    remove(entity:T, successCallback:(data:T, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, errorCallback:(data:MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.$http({method: "DELETE",
        url: this.apiUrl + "/" + entity.id})
        .success(successCallback)
        .error(errorCallback);
    }

    find(id:number, successCallback:(data:T, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, errorCallback:(data:MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.$http({method: "GET",
        url: this.apiUrl + "/" + id})
        .success(successCallback)
        .error(errorCallback);
    }

    list(successCallback:(data:T[], status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, errorCallback:(data:MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, page?:Page) {
      var pageHeader = ((page != null) ? <entity.PageHeader>{ page_index: page.index, page_size: page.size } : null);
      this.$http({method: "GET",
        url: this.apiUrl,
        headers: pageHeader })
        .success(successCallback)
        .error(errorCallback);
    }

    exists(entity:T, successCallback:(data:boolean, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, errorCallback:(data:MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.find(entity.id, (d, s, h, c) => {
        if (angular.equals(d, entity))
          successCallback(true, s, h, c);
        else
          successCallback(false, s, h, c);
      }, (d, s, h, c) => {
        errorCallback(d, s, h, c);
      });

    }
  }
}

angular.module("lwa.entity").service("EntityService", entity.EntityServiceImpl);
