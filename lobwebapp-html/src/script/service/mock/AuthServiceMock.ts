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
                        if (!x.isLogged && x.password === user.password) {
                            this.user = user;
                            this.user.isLogged = true;
                            successCallback(this.user, 200, null, null);
                            this.$rootScope.$broadcast("USER_CHANGED", [this.user]);
                        }
                        else {
                            errorCallback({message: "Senha incorreta ou Usuário já fez login"}, 200, null, null);
                        }
                    }, () => {
                        errorCallback({message: "Usuário não existe"}, 200, null, null);
                    });
        }

        logout(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.UserService.findByUsername(user.username,
                    (x: domain.User) => {
                        if (x.isLogged && x.password === user.password) {
                            x.isLogged = false;
                            successCallback(x, 200, null, null);
                            this.temporaryUser();
                            this.$rootScope.$broadcast("USER_CHANGED", [this.user]);
                            return;
                        }
                        errorCallback({message: "Senha incorreta ou usuário já fez logout"}, 200, null, null);
                    }, () => {
                        errorCallback({message: "Usuário não existe"}, 200, null, null);
                    });
        }

        isLoggedIn() {
            return this.user.isLogged;
        }

        currentUser() {
            return this.user;
        }

        private temporaryUser() {
            this.user = { id: 0, username: "", password: "", role: null, isLogged: false };
        }

    }
}