///<reference path="../../../reference.d.ts"/>

export module service.impl.base {
    export class EntityServiceImpl<T extends domain.base.AbstractEntity> implements d.service.contract.base.EntityService<T> {

        private hasDefault;
        private rootUrl = "/api/v1/";
        public url: string;

        constructor(contextUrl: string, public $http: ng.IHttpService, hasDefault?: d.service.contract.base.HasDefaultValue<T>) {
            this.url = this.rootUrl + contextUrl + "/";
            this.hasDefault = hasDefault;
        }

        save(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http({method: "POST", 
                            url: this.url, 
                            data: entity})
                    .success(successCallback)
                    .error(errorCallback);
        }

        update(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http({method: "PUT", 
                            url: this.url + entity.id, 
                            data: entity})
                    .success(successCallback)
                    .error(errorCallback);
        }

        remove(entity: T,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$http({method: "DELETE", 
                            url: this.url + entity.id})
                    .success(successCallback)
                    .error(errorCallback);
        }

        find(id: number,
            successCallback: (data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if(id == 0 && this.hasDefault)
                    successCallback(this.hasDefault.getDefault(), 200, () => { return ""; }, <any>{});
                else
                    this.$http({method: "GET",
                                url: this.url + id})
                        .success(successCallback)
                        .error(errorCallback);
        }

        list(
            successCallback: (data: T[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            page?: domain.util.Page) {
                this.$http({method: "GET", 
                            url: this.url, 
                            headers: this.getPageablePostHeaders(page) })
                    .success(successCallback)
                    .error(errorCallback);
        }

        exists(entity: T,
            successCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.find(entity.id, (d, s, h, c) => {
                    if (_.isEqual(d, entity))
                        successCallback(true, s, h, c);
                    else
                        successCallback(false, s, h, c);
                }, (d, s, h, c) => {
                        errorCallback(d, s, h, c);
                    });
            
        }

        getPageableRequestParams(page: domain.util.Page) {
            if(page)
                return { page: page.index, size: page.size };
            return {};
        }

        getPageablePostHeaders(page: domain.util.Page) {
            if(page)
                return { page_index: page.index, page_size: page.size };
            return {};
        }

    }
}