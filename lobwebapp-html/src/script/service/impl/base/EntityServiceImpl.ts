///<reference path="./../../../reference.d.ts"/>

export module service.impl.base {
    export class EntityServiceImpl<T extends domain.base.AbstractEntity> implements d.service.contract.base.EntityService<T> {

        private rootUrl: string = "/api/";
        public url: string;

        constructor(contextUrl: string, public $http: ng.IHttpService) {
            this.url = this.rootUrl + contextUrl;
        }

        public save(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.$http.post(this.url, entity).success(successCallback).error(errorCallback);
        }

        public update(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.$http.put(this.url, entity).success(successCallback).error(errorCallback);
        }

        public remove(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.$http.delete(this.url, entity).success(successCallback).error(errorCallback);
        }

        public find(id: number,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.$http.get(this.url + "/" + id).success(successCallback).error(errorCallback);
        }

        public list(successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.$http.get(this.url).success(successCallback).error(errorCallback);
        }

        public contains(entity: T,
            successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.find(entity.id, (d, s, h, c) => {
                if (_.isEqual(d, entity))
                    successCallback(true, s, h, c);
            }, (d, s, h, c) => {
                    errorCallback(d, s, h, c);
                });
        }

    }
}