///<reference path="../../reference.ts"/>

module service.contract {
    export interface ProductService extends base.EntityService<domain.Product> {

        findByName(name: string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            pageable: domain.util.Page): void;

        listCategory(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;
        
        getImageUrl(productId: number): string;
        getMarkUp(product: domain.Product): number;
    }
}