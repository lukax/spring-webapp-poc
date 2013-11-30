///<reference path="./../../reference.d.ts"/>
import a = require("./UserServiceImpl");

export module service.impl {
    export class AuthServiceImpl implements d.service.contract.AuthService {
        private defaultUser: domain.User = { id: 1, name: "Usuário", isLogged: true, username: "user", password: "", roles: ["ROLE_USER"] };
        private emptyUser: domain.User = { id: 0, username: "", password: "", roles: [], name: "" };

        static $inject = ["$http", "$rootScope"];
        constructor(public $http: ng.IHttpService, public $rootScope: ng.IRootScopeService) {

        }

        public login(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                var param = "?grant_type=password&client_id=lobwebapp-html&client_secret=supersecretyeah&username=" + user.username + "&password=" + user.password;
                this.$http.get("/api/oauth/token" + param)
                    .success((data: domain.AuthToken, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => {
                        this.setToken(data);
                        this.setUser(this.defaultUser);  //TODO: make server return user information after login...
                        this.authorize(data);
                        
                        successCallback(this.defaultUser, status, headers, config);
                    }).error(errorCallback);
        }

        public logout(
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if (this.getUser().id != 0) {
                    var previousUser = this.getUser();
                    this.setToken(null);
                    this.setUser(this.emptyUser);
                    this.unauthorize();
                
                    successCallback(previousUser, 200, null, null);
                }
                else
                    errorCallback({ description: "Usuário já está deslogado" }, 200, null, null);
        }

        public isLoggedIn() {
            var token = this.getToken();
            if (token != null) {
                this.authorize(token);
                return true;
            }
            return false;
        }

/*        private refreshAccess(authToken: domain.AuthToken, callback: (data: boolean) => void){
            this.$http.get("/api/oauth/token?grant_type=refresh_token&client_id=lobwebapp-html&client_secret=supersecretyeah&refresh_token=" + authToken.refresh_token)
                        .success((data: domain.AuthToken, status)=>{
                                this.setToken(data);
                                this.authorize(data);

                                callback(true);
                            }).error(()=>{
                                callback(false);    
                            });
        }*/

        private authorize(authToken: domain.AuthToken) {
            var key = authToken.token_type + " " + authToken.access_token;
            if (this.$http.defaults.headers.common["Authorization"] != key) {
                this.$http.defaults.headers.common["Authorization"] = key;
            }
        }

        private unauthorize() {
            delete this.$http.defaults.headers.common["Authorization"];
        }

        public getUser(): domain.User {
            var retrievedUser = null;
            try {
                retrievedUser = <domain.User>angular.fromJson((<any>localStorage).AUTHSERVICE_USER);
            }
            catch (Exception) {  }
            if (retrievedUser == null) return this.emptyUser;
            return retrievedUser;
        }

        private setUser(user: domain.User) {
            (<any>localStorage).AUTHSERVICE_USER = angular.toJson(user);
            this.$rootScope.$broadcast("USER_CHANGED", [user]);
        }

        private getToken() {
            var retrievedToken = null;
            try {
                retrievedToken = angular.fromJson((<any>localStorage).AUTHSERVICE_TOKEN);
            }
            catch (Exception) { return null; }
            return retrievedToken;
        }

        private setToken(authToken: domain.AuthToken) {
            (<any>localStorage).AUTHSERVICE_TOKEN = angular.toJson(authToken);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("AuthService", service.impl.AuthServiceImpl);
};