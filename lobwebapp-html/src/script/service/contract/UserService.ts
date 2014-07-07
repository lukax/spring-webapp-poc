///<reference path="../../reference.d.ts"/>

module service.contract {
    export interface UserService extends base.EntityService<domain.User> {

        findByUsername(username: string,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

    }
}