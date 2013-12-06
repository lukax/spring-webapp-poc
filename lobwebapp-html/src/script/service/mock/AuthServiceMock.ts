///<reference path="./../../reference.d.ts"/>
import a = require("./UserServiceMock");

export module service.mock {
    export class AuthServiceMock implements d.service.contract.AuthService {
        private user: domain.User;
        private temporaryUser: domain.User = { id: 0, username: "", password: "", roles: [], name: "" };

        static $inject = ["$timeout", "UserService", "$rootScope"];
        constructor(public $timeout: ng.ITimeoutService, public UserService: a.service.mock.UserServiceMock, public $rootScope: ng.IRootScopeService) {
            this.setUser(this.temporaryUser);
        }

        login(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.UserService.findByUsername(user.username,
                    (x: domain.User) => {
                        if (x.password === user.password) {
                            this.setUser(user);
                            successCallback(this.user, 200, null, null);
                        }
                        else {
                            errorCallback({ message: "Senha incorreta ou Usuário já fez login"}, 200, null, null);
                        }
                    }, () => {
                        errorCallback({ message: "Usuário não existe"}, 200, null, null);
                    });
        }

        logout(
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if (this.user.id != 0) {
                    this.setUser(this.temporaryUser);
                    successCallback(this.user, 200, null, null);
                }
                else {
                    errorCallback({ message: "Usuário já está deslogado"}, 200, null, null);
                }
        }

        isLoggedIn() {
            return (this.user.id != 0);
        }

        getUser() {
            return this.user;
        }

        private setUser(user: domain.User) {
            this.user = user;
            this.$rootScope.$broadcast("USER_CHANGED", [user]);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("AuthService", service.mock.AuthServiceMock);
};