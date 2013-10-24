///<reference path="./../../reference.d.ts"/>

module d.service.contract {
    export interface UserService extends d.service.contract.base.EntityService<domain.User> {

        findByUsername(username: string,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

    }

    export interface UserRole {
        admin: string;
        manager: string;
        salesman: string;
        client: string;
    }
}