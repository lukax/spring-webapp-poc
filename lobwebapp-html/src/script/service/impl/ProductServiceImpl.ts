///<reference path="./../../reference.d.ts"/>
import a = require("./base/EntityServiceImpl");

export module service.impl {
    export class ProductServiceImpl extends a.service.impl.base.EntityServiceImpl<domain.Product> 
            implements d.service.contract.ProductService, d.service.contract.base.HasDefaultValue<domain.Product> {

        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("product", $http, this);
        }

        findByName(name: string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            pageable: domain.util.Page) {
                var header = "%" + name + "%";
                this.$http.get(this.url + this.getPageableUri(pageable), { headers: { product_name: header } }).success(successCallback).error(errorCallback);
        }

        listCategory(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http.get(this.url + "category").success(successCallback).error(errorCallback);
        }
        
        getDefault(): domain.Product{
            return { id: 0, name: "", description: "", price: 0, costPrice: 0, category: "", ncm: "", registerDate: new Date().getTime() };
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("ProductService", service.impl.ProductServiceImpl);
};