///<reference path="./../../reference.d.ts"/>

module d.service.contract {
    export interface AuthService {
        login(user: domain.User,
            successCallback: (user: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (error: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        logout(
            successCallback: (previousUser: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (error: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        getUser(): domain.User;

        isLoggedIn(): void;
    }
}