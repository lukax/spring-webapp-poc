///<reference path="../reference.ts"/>

module product {
  export class ProductServiceImpl extends core.EntityServiceImpl<product.Product> implements ProductService {

    static $inject = ["$http", "apiUrl"];
    constructor(public $http:ng.IHttpService,
                public apiUrl:string) {
      super($http, apiUrl);
    }

    findByName(name:string,
               successCallback:(data:Product[], status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any,
               errorCallback:(data:core.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, page:core.Page) {
      var params = {
        name: "%" + name + "%"
      };
      var headers = <core.PageHeader>{ page_index: page.index, page_size: page.size };

      this.$http({method: "GET",
        url: this.apiUrl,
        params: params,
        headers: headers })
        .success(successCallback)
        .error(errorCallback);
    }

    listCategory(successCallback:(data:string[], status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any,
                 errorCallback:(data:core.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.list((products, status, headers, config) => {
          var categories = [];
          products.forEach((x) => {
            if (categories.indexOf(x) === -1)
              categories.push(x);
          });
          successCallback(categories, status, headers, config);
        },
        errorCallback);
    }

    default() {
      return { id: 0, name: "", description: "", price: 0, costPrice: 0, category: "", ncm: "" };
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

product.module.service("ProductService", product.ProductServiceImpl);
