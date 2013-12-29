///<reference path="./../../reference.d.ts"/>

module d.service.contract {
    export interface ProductService extends d.service.contract.base.EntityService<domain.Product> {

        findByName(name: string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            pageable: domain.util.Pageable): void;

        listCategory(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;
        
        getImage(id: number, 
            successCallback: (imageUrl: string, putImageUrl: string, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;
    }
}