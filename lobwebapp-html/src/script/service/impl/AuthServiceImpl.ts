///<reference path="../../reference.d.ts"/>
import a = require("./UserServiceImpl");

export module service.impl {
    export class AuthServiceImpl implements d.service.contract.AuthService {
        private url = "/api/oauth/token";
        private client_id = "da39a3ee5e6b4b0d3255bfef95601890afd80709";
        private defaultUser: domain.User = { id: 1, name: "Usuário", isLogged: true, username: "user", password: "", roles: ["ROLE_USER"] };
        
        static $inject = ["$http", "$rootScope", "$window"];
        constructor(public $http: ng.IHttpService, 
                    public $rootScope: ng.IRootScopeService,
                    public $window: ng.IWindowService) {

        }

        login(user: domain.User,
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (error: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                var authData = "grant_type=password" + 
                            "&client_id=" + this.client_id +  
                            "&username=" + user.username + 
                            "&password=" + user.password;
                var headers = {
                    "Content-Type": "application/x-www-form-urlencoded"
                };
                
                this.$http({method: "POST", 
                             url: this.url, 
                             data: authData, 
                             headers: headers})
                    .success((data: domain.AuthToken, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => {
                        var user = angular.copy(this.defaultUser); //TODO: make server return user information after login...
                        this.setUser(user);
                        this.setToken(data);
                        this.authorize(data);
                    
                        successCallback(user, status, headers, config);
                    })
                    .error(errorCallback);
        }

        logout(
            successCallback: (data: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                if (this.getUser() && this.getUser().id != 0) {
                    var previousUser = this.getUser();
                    this.setToken(null);
                    this.setUser(null);
                    this.unauthorize();
                
                    successCallback(previousUser, 200, null, null);
                }
                else
                    errorCallback({ message: "Usuário já saiu" }, 200, null, null);
        }

        isLoggedIn() {
            var token = this.getToken();
            if (token != null) {
                this.authorize(token);
                return true;
            }
            return false;
        }

        getUser(): domain.User {
            var retrievedUser = angular.fromJson((<any>this.$window.localStorage).AUTHSERVICE_USER) || { id: 0, username: "", password: "", roles: [], name: "" };
            return retrievedUser;
        }

        private authorize(authToken: domain.AuthToken) {
            var key = authToken.token_type + " " + authToken.access_token;
            if (this.$http.defaults.headers.common["Authorization"] != key) {
                this.$http.defaults.headers.common["Authorization"] = key;
            }
        }

        private unauthorize() {
            delete this.$http.defaults.headers.common["Authorization"];
        }

        private getToken() {
            var retrievedToken = null;
            try {
                retrievedToken = angular.fromJson((<any>this.$window.localStorage).AUTHSERVICE_TOKEN);
            }
            catch (Exception) { 
            }
            return retrievedToken;
        }

        private setToken(authToken: domain.AuthToken) {
            (<any>this.$window.localStorage).AUTHSERVICE_TOKEN = angular.toJson(authToken);
        }

        private setUser(user: domain.User) {
            if(user == null) user = { id: 0, username: "", password: "", roles: [], name: "" };
            (<any>this.$window.localStorage).AUTHSERVICE_USER = angular.toJson(user);
            this.$rootScope.$broadcast("USER_CHANGED", [user]);
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("AuthService", service.impl.AuthServiceImpl);
};