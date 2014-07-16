///<reference path="../../../reference.ts"/>

module product.core {
  export class ProductServiceImpl extends entity.EntityServiceImpl<product.core.Product> implements ProductService {

    static $inject = ["$http", "apiUrl"];
    constructor(public $http:ng.IHttpService,
                public apiUrl: string) {
      super($http, apiUrl);
    }

    findByName(name:string, successCallback:(data:Product[], status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, errorCallback:(data:entity.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, page:entity.Page) {
      var params = {
        name: "%" + name + "%"
      };
      var headers = <entity.PageHeader>{ page_index: page.index, page_size: page.size };

      this.$http({method: "GET",
        url: this.apiUrl,
        params: params,
        headers: headers })
        .success(successCallback)
        .error(errorCallback);
    }

    listCategory(successCallback:(data:string[], status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, errorCallback:(data:entity.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.list((products, status, headers, config) => {
          var categories = [];
          products.forEach((x) => {
            if(categories.indexOf(x) === -1)
              categories.push(x);
          });
          successCallback(categories, status, headers, config);
        },
        errorCallback);
    }

    getImageUrl(productId:number) {
      var authHeader = this.$http.defaults.headers.common.Authorization;
      var params = "";
      if (authHeader != null) {
        var accessToken = authHeader.split(" ")[1];
        params = "?access_token=" + accessToken;
      }
      return this.apiUrl + "/" + productId + "/image" + params;
    }

    getMarkUp(product:Product) {
      if (product.costPrice == 0)
        return 0;
      return (product.price - product.costPrice) / product.costPrice;
    }
  }
}
