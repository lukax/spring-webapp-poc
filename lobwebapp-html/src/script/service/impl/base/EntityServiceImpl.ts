///<reference path="./../../../reference.d.ts"/>

export module service.impl.base {
    export class EntityServiceImpl<T extends domain.base.AbstractEntity> implements d.service.contract.base.EntityService<T> {

        private rootUrl: string = "/api/";
        public url: string;

        constructor(contextUrl: string, public $http: ng.IHttpService) {
            this.url = this.rootUrl + contextUrl + "/";
        }

        public save(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http.post(this.url, entity).success(successCallback).error(errorCallback);
        }

        public update(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http.put(this.url + entity.id, entity).success(successCallback).error(errorCallback);
        }

        public remove(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http.delete(this.url + entity.id).success(successCallback).error(errorCallback);
        }

        public find(id: number,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http.get(this.url + id).success(successCallback).error(errorCallback);
        }

        public list(
            successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            pageable?: domain.util.Pageable) {
                if (pageable)
                    this.$http({ method: "GET", url: this.url, headers: pageable }).success(successCallback).error(errorCallback);
                else
                    this.$http.get(this.url).success(successCallback).error(errorCallback);
        }

        public exists(entity: T,
            successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.find(entity.id, (d, s, h, c) => {
                    if (_.isEqual(d, entity))
                        successCallback(true, s, h, c);
                    else
                        successCallback(false, s, h, c);
                }, (d, s, h, c) => {
                        errorCallback(d, s, h, c);
                    });
            
        }

        public getPageableUri(p: domain.util.Pageable) {
            return "?page=" + p.page_index + "&size=" + p.page_size;
        }

    }
}