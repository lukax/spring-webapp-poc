///<reference path="./../../reference.d.ts"/>
import a = require("./UserServiceMock");

export module service.mock {
    export class AuthServiceMock implements d.service.contract.AuthService {
        private user: domain.User;

        static $inject = ["$timeout", "UserService", "$rootScope"];
        constructor(public $timeout: ng.ITimeoutService, public UserService: a.service.mock.UserServiceMock, public $rootScope: ng.IRootScopeService) {
            this.temporaryUser();
        }

        login(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.UserService.findByUsername(user.username,
                    (x: domain.User) => {
                        if (x.password === user.password) {
                            this.user = user;
                            this.$rootScope.$broadcast("USER_CHANGED", [this.user]);
                            successCallback(this.user, 200, null, null);
                        }
                        else {
                            errorCallback({ description: "Senha incorreta ou Usuário já fez login"}, 200, null, null);
                        }
                    }, () => {
                        errorCallback({ description: "Usuário não existe"}, 200, null, null);
                    });
        }

        logout(
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if (this.user.id != 0) {
                    this.temporaryUser();
                    this.$rootScope.$broadcast("USER_CHANGED", [this.user]);
                    successCallback(this.user, 200, null, null);
                }
                else {
                    errorCallback({ description: "Usuário já está deslogado"}, 200, null, null);
                }
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
    angular.module(moduleName).lazy.service("AuthService", service.mock.AuthServiceMock);
};