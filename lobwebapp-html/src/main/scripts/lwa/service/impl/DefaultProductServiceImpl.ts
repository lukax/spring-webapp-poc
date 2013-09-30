///<reference path="./../../reference.d.ts"/>
import a = require('./base/AbstractEntityServiceImpl');

export module service.impl {
    export class DefaultProductService extends a.service.impl.base.AbstractEntityService<domain.Product> implements d.service.contract.ProductService {

        static $inject = ['$http'];
        constructor($http: ng.IHttpService) {
            super('product', $http);
        }

        public findByName(name: string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
        }

        public listGroups(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: string, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
        }
    }
}