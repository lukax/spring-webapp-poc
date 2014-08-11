///<reference path="../reference.ts"/>

module product {
  export interface ProductService extends core.EntityService<Product> {
      findByName(name: string,
          successCallback: (data: Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
          errorCallback: (data: core.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
          pageable: core.Page): void;

      listCategory(
          successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
          errorCallback: (data: core.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
          ): void;

      getImageUrl(productId: number): string;
      getMarkUp(product: Product): number;
  }
}
