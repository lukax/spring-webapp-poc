///<reference path="../../../reference.ts"/>

module product.core {
  export interface ProductService extends entity.EntityService<Product> {
      findByName(name: string,
          successCallback: (data: Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
          errorCallback: (data: entity.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
          pageable: entity.Page): void;

      listCategory(
          successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
          errorCallback: (data: entity.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
          ): void;

      getImageUrl(productId: number): string;
      getMarkUp(product: Product): number;
  }
}
