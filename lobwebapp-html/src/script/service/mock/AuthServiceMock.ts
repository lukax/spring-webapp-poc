///<reference path="../../reference.d.ts"/>

export module service.mock {
    export class AuthServiceMock implements d.service.contract.AuthService {
        private defaultUser: domain.User = { id: 1, username: "usuario", password: "senha", roles: [], name: "Usuário" };
        private user: domain.User;
        
        static $inject = ["$timeout", "$rootScope"];
        constructor(public $timeout: ng.ITimeoutService, public $rootScope: ng.IRootScopeService) {

        }

        login(user: domain.User,
            successCallback: (user: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    if(!this.isLoggedIn() && (this.defaultUser.password === user.password)) {
                        this.setUser(this.defaultUser);
                        successCallback(this.getUser(), 200, null, null);
                    }
                    else {
                        errorCallback({ message: "Senha incorreta ou Usuário já fez login"}, 200, null, null);
                    }
                }, 1000);
        }

        logout(
            successCallback: (previousUser: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if (this.isLoggedIn()) {
                	var previousUser = this.getUser();
                    this.setUser(null);
                    successCallback(previousUser, 200, null, null);
                }
                else {
                    errorCallback({ message: "Usuário já saiu"}, 200, null, null);
                }
        }

        isLoggedIn() {
            return true;//(this.getUser() != null);
        }

        getUser(): domain.User {
            return this.user;
        }

        private setUser(user: domain.User) {
        	this.user = user;
            this.$rootScope.$broadcast("USER_CHANGED", [(user)]);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("AuthService", service.mock.AuthServiceMock);
};