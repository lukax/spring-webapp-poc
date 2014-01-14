///<reference path="./../../../reference.d.ts"/>

export module service.impl.base {
    export class EntityServiceImpl<T extends domain.base.AbstractEntity> implements d.service.contract.base.EntityService<T> {

        private hasDefault;
        private rootUrl = "/api/";
        public url: string;
        
        constructor(contextUrl: string, public $http: ng.IHttpService, hasDefault?: d.service.contract.base.HasDefaultValue<T>) {
            this.url = this.rootUrl + contextUrl + "/";
            this.hasDefault = hasDefault;
        }

        save(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http.post(this.url, entity).success(successCallback).error(errorCallback);
        }

        update(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http.put(this.url + entity.id, entity).success(successCallback).error(errorCallback);
        }

        remove(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http.delete(this.url + entity.id).success(successCallback).error(errorCallback);
        }

        find(id: number,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if(id == 0 && this.hasDefault)
                    successCallback(this.hasDefault.getDefault(), 200, () => { return ""; }, <any>{});
                else
                    this.$http.get(this.url + id).success(successCallback).error(errorCallback);
        }

        list(
            successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            page?: domain.util.Page) {
                if (page)
                    this.$http({ method: "GET", url: this.url, headers: this.getPageableHeader(page) }).success(successCallback).error(errorCallback);
                else
                    this.$http.get(this.url).success(successCallback).error(errorCallback);
        }

        exists(entity: T,
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

        getPageableUri(p: domain.util.Page) {
            return "?page=" + p.index + "&size=" + p.size;
        }

        getPageableHeader(page: domain.util.Page) {
            return { page_index: page.index, page_size: page.size };
        }

    }
}