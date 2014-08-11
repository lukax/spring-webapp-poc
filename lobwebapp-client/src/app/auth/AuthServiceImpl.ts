///<reference path="../reference.ts"/>

module auth {
  export class AuthServiceImpl implements AuthService {
    private url = "/api/oauth/token";
    private clientCredentials = "bG9id2ViYXBwLWh0bWw6";
    private defaultUser:User = { id: 1, name: "Lucas", username: "", password: "", roles: ["ROLE_USER"] };

    static $inject = ["$http", "$rootScope", "$window"];
    constructor(public $http:ng.IHttpService,
                public $rootScope:ng.IRootScopeService,
                public $window:ng.IWindowService) {

    }

    login(user:User,
          successCallback:(data:User, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any,
          errorCallback:(error:core.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      var data = "grant_type=password" +
        "&username=" + user.username +
        "&password=" + user.password +
        "&scope=write";
      var headers = {
        "Authorization": "Basic " + this.clientCredentials,
        "Content-Type": "application/x-www-form-urlencoded"
      };

      this.$http({method: "POST",
        url: this.url,
        data: data,
        headers: headers})
        .success((data:AuthToken, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => {
          var user = angular.copy(this.defaultUser); //TODO: make server return user information after login...
          this.setUser(user);
          this.setToken(data);
          this.authorize(data);

          successCallback(user, status, headers, config);
          this.$rootScope.$broadcast("USER_CHANGED", [(user)]);
        })
        .error(errorCallback);
    }

    logout(successCallback:(data:User, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any,
           errorCallback:(data:core.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      if (this.getUser() && this.getUser().id != 0) {
        var previousUser = this.getUser();
        this.setToken(null);
        this.setUser(null);
        this.unauthorize();

        successCallback(previousUser, 200, null, null);
        this.$rootScope.$broadcast("USER_CHANGED", [(previousUser)]);
      }
      else
        errorCallback({ message: "Usuário já saiu" }, 200, null, null);
    }

    isLoggedIn():boolean {
      var token = this.getToken();
      if (token != null) {
        this.authorize(token);
        return true;
      }
      return false;
    }

    getUser():User {
      var user = null;
      try {
        user = angular.fromJson((<any>this.$window.localStorage).AUTHSERVICE_USER);
      } catch (Exception) {
        console.log("[ERROR]: Could not retrieve user");
      }
      return user;
    }

    private authorize(authToken:AuthToken) {
      var key = authToken.token_type + " " + authToken.access_token;
      if (this.$http.defaults.headers.common["Authorization"] != key) {
        this.$http.defaults.headers.common["Authorization"] = key;
      }
    }

    private unauthorize() {
      delete this.$http.defaults.headers.common["Authorization"];
    }

    private getToken() {
      var token = null;
      try {
        token = angular.fromJson((<any>this.$window.localStorage).AUTHSERVICE_TOKEN);
      } catch (Exception) {
        console.log("[ERROR]: Could not retrieve token");
      }
      return token;
    }

    private setToken(authToken:AuthToken) {
      (<any>this.$window.localStorage).AUTHSERVICE_TOKEN = angular.toJson(authToken);
    }

    private setUser(user:User) {
      (<any>this.$window.localStorage).AUTHSERVICE_USER = angular.toJson(user);
    }
  }
}

auth.module.service("AuthService", auth.AuthServiceImpl);
