///<reference path="./../../reference.d.ts"/>
import a = require('./UserServiceMock');;

export module service.mock {
    export class DefaultAuthService implements d.service.contract.AuthService {
        private timeoutService: ng.ITimeoutService;
        private userService: a.service.mock.DefaultUserService;
        private user: domain.User;

        static $inject = ['$timeout', 'UserService','$rootScope'];
        constructor($timeout: ng.ITimeoutService, UserService: a.service.mock.DefaultUserService, public $rootScope: ng.IRootScopeService) {
            this.timeoutService = $timeout;
            this.userService = UserService;
            this.temporaryUser();
        }

        login(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.userService.findByUsername(user.username,
                (x: domain.User) => {
                    if (x.password === user.password) {
                        this.user = user;
                        this.user.isLogged = true;
                        successCallback(this.user, 200, null, null);
                        this.$rootScope.$broadcast('USER_CHANGED', [this.user]);
                    }
                    else {
                        errorCallback(false, 200, null, null);
                    }
                }, () => {
                    errorCallback(false, 200, null, null);
                });
        }

        logout(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: boolean, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
            this.userService.findByUsername(user.username,
                (x: domain.User) => {
                    if (x.password === user.password) {
                        this.temporaryUser();
                        successCallback(this.user, 200, null, null);
                        this.$rootScope.$broadcast('USER_CHANGED', [this.user]);
                        return;
                    }
                    errorCallback(false, 200, null, null);
                }, () => {
                    errorCallback(false, 200, null, null);
                }
                );
        }

        isLoggedIn() {
            return this.user.isLogged;
        }

        currentUser() {
            return this.user;
        }

        private temporaryUser() {
            this.user = { id: 0, username: '', password: '', role: null, isLogged: false };
        }

    }
}