///<reference path="../reference.ts"/>

module auth {
    export interface AuthService {
        login(user: User,
            successCallback: (user: User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (error: core.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        logout(
            successCallback: (previousUser: User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (error: core.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any
            ): void;

        getUser(): User;

        isLoggedIn(): boolean;
    }
}
