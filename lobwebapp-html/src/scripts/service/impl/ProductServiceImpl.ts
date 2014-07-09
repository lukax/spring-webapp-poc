///<reference path="../../reference.ts"/>

module service.impl {
    export class ProductServiceImpl extends base.EntityServiceImpl<domain.Product> 
            implements service.contract.ProductService, service.contract.base.HasDefaultValue<domain.Product> {

        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("product", $http, this);
        }

        findByName(name: string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            page: domain.util.Page) {
                var params = {
                    name: "%" + name + "%"
                };
                var headers = this.getPageableRequestHeaders(page);
                
                this.$http({method: "GET",
                            url: this.url, 
                            params: params,
                            headers: headers })
                    .success(successCallback)
                    .error(errorCallback);
        }

        listCategory(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.list((successData, status, headers, config) => {
                        var categories = _.uniq(_.map(successData, (x) => { return x.category; }));
                        successCallback(categories, status, headers, config);
                    },
                    errorCallback);
        }

        getImageUrl(productId: number){
            var authHeader = this.$http.defaults.headers.common.Authorization;
            var params = "";
            if(authHeader != null){
                var accessToken = authHeader.split(" ")[1];
                params = "?access_token=" + accessToken;
            }
            return this.url + "/" + productId + "/image" + params;
        }

        getMarkUp(product: domain.Product){
            if (product.costPrice == 0) 
                return 0;
            return (product.price - product.costPrice) / product.costPrice;
        }
        
        getDefault(): domain.Product{
            return { id: 0, name: "", description: "", price: 0, costPrice: 0, category: "", ncm: "" };
        }
    }
}
