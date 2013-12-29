///<reference path="./../../reference.d.ts"/>
import a = require("./base/EntityServiceImpl");

export module service.impl {
    export class ProductServiceImpl extends a.service.impl.base.EntityServiceImpl<domain.Product> implements d.service.contract.ProductService {

        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("product", $http);
        }

        findByName(name: string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            pageable: domain.util.Pageable) {
                var header = "%" + name + "%";
                this.$http.get(this.url + this.getPageableUri(pageable), { headers: { product_name: header } }).success(successCallback).error(errorCallback);
        }

        listCategory(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http.get(this.url + "category").success(successCallback).error(errorCallback);
        }

        getImage(id: number, 
            successCallback: (getImageUrl: string, putImageUrl: string, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                var imageUrl = this.url + id + "/image";
                var placeholder = "/img/imageplaceholder.png";
                if(id == 0){
                    successCallback(placeholder, imageUrl, 200, null, null);
                }
                else{
                    this.$http.get(imageUrl)
                        .success((d, s, h, c)=>{ successCallback(imageUrl, imageUrl, s, h, c); })
                        .error((d, s, h, c)=>{ successCallback(placeholder, imageUrl, s, h, c); });
                }
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("ProductService", service.impl.ProductServiceImpl);
};