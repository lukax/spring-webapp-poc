///<reference path="./../../reference.d.ts"/>
import a = require("./UserServiceImpl");

export module service.impl {
    export class AuthServiceImpl implements d.service.contract.AuthService {
        private user: domain.User;
        private authToken: domain.AuthToken;

        static $inject = ["$http", "$rootScope"];
        constructor(public $http: ng.IHttpService, public $rootScope: ng.IRootScopeService) {
            this.temporaryUser();
        }

        login(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                var param = "?grant_type=password&client_id=lobwebapp-html&client_secret=supersecretyeah&username=" + user.username + "&password=" + user.password;
                this.$http.get("/api/oauth/token" + param)
                    .success((data: domain.AuthToken, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => {
                        this.authToken = data;
                        this.$http.defaults.headers.common["Authorization"] = "Bearer " + this.authToken.access_token;
                        this.user = { name: "Usuário", isLogged: true, username: "user", password: "password", id: 1, roles: ["ROLE_USER"] };
                        this.$rootScope.$broadcast("USER_CHANGED", [this.user]);
                        //TODO: make server return REAL user information after login...
                        successCallback(this.user, status, headers, config);
                    }).error(errorCallback);
        }

        logout(
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if (this.user.id != 0) {
                    delete this.$http.defaults.headers.common["Authorization"];
                    this.temporaryUser();
                    successCallback(this.user, 200, null, null);
                }
                else
                    errorCallback({ message: "Usuário já está deslogado" }, 200, null, null);
        }

        isLoggedIn() {
            return (this.user.id != 0);
        }

        currentUser() {
            return this.user;
        }

        private temporaryUser() {
            this.user = { id: 0, username: "", password: "", roles: [], name: "" };
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("AuthService", service.impl.AuthServiceImpl);
};