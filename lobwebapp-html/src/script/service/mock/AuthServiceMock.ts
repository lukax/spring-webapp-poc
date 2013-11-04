///<reference path="./../../reference.d.ts"/>
import a = require("./UserServiceMock");

export module service.mock {
    export class DefaultAuthService implements d.service.contract.AuthService {
        private user: domain.User;

        static $inject = ["$timeout", "UserService","$rootScope"];
        constructor(public $timeout: ng.ITimeoutService, public UserService: a.service.mock.DefaultUserService, public $rootScope: ng.IRootScopeService) {
            this.temporaryUser();
        }

        login(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    this.UserService.findByUsername(user.username,
                        (x: domain.User) => {
                            if (x.password === user.password) {
                                this.user = user;
                                this.user.isLogged = true;
                                successCallback(this.user, 200, null, null);
                                this.$rootScope.$broadcast("USER_CHANGED", [this.user]);
                            }
                            else {
                                errorCallback(null, 200, null, null);
                            }
                        }, () => {
                            errorCallback(null, 200, null, null);
                        });
                }, 100);
        }

        logout(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    this.UserService.findByUsername(user.username,
                        (x: domain.User) => {
                            if (x.password === user.password) {
                                this.temporaryUser();
                                successCallback(this.user, 200, null, null);
                                this.$rootScope.$broadcast("USER_CHANGED", [this.user]);
                                return;
                            }
                            errorCallback(null, 200, null, null);
                        }, () => {
                            errorCallback(null, 200, null, null);
                        });
                }, 100);
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