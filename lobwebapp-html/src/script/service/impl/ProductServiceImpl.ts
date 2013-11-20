///<reference path="./../../reference.d.ts"/>
import a = require("./base/EntityServiceImpl");

export module service.impl {
    export class ProductServiceImpl extends a.service.impl.base.EntityServiceImpl<domain.Product> implements d.service.contract.ProductService {

        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            super("product", $http);
        }

        public findByName(name: string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.$http.get(this.url + '/' + name, { headers: {"findByName": "true"} }).success(successCallback).error(errorCallback);
        }

        public listCategory(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.$http.get(this.url, { headers: {"listCategory": "true"} }).success(successCallback).error(errorCallback);
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("ProductService", service.impl.ProductServiceImpl);
};