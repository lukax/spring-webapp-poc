///<reference path="./../../reference.d.ts"/>
import a = require("./UserServiceImpl");

export module service.impl {
    export class AuthServiceImpl implements d.service.contract.AuthService {
        private user: domain.User;

        static $inject = ["$http", "$rootScope"];
        constructor(public $http: ng.IHttpService, public $rootScope: ng.IRootScopeService) {
            this.temporaryUser();
        }

        login(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                var param = "username=" + user.username + "&password=" + user.password;
                console.log(param);
                this.$http.post("/api/login", param,  
                    { headers: {"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(successCallback).error(errorCallback);
            //TODO: make server return user information after login...
        }

        logout(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            //TODO: implement this
        }

        isLoggedIn() {
            return this.user.isLogged;
        }

        currentUser() {
            return this.user;
        }

        private temporaryUser() {
            this.user = { id: 0, username: "", password: "", roles: [], firstName: "", lastName: "" };
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("AuthService", service.impl.AuthServiceImpl);
};