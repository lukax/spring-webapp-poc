///<reference path="../reference.ts"/>

module auth {
  export class AuthServiceMock implements AuthService {
    private defaultUser:User = { id: 1, username: "usuario", password: "senha", roles: [], name: "Usuário" };
    private user:User;

    static $inject = ["$timeout", "$rootScope"];
    constructor(public $timeout:ng.ITimeoutService,
                public $rootScope:ng.IRootScopeService) {

    }

    login(user:User,
          successCallback:(user:User, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any,
          errorCallback:(data:core.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.$timeout(() => {
        if (!this.isLoggedIn() && (this.defaultUser.password === user.password)) {
          var user = this.defaultUser;
          this.setUser(user);

          successCallback(user, 200, () => "", null);
          this.$rootScope.$broadcast("USER_CHANGED", [(user)]);
        }
        else {
          errorCallback({ message: "Senha incorreta ou Usuário já fez login" }, 200, () => "", null);
        }
      }, 1000);
    }

    logout(successCallback:(previousUser:User, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any,
           errorCallback:(data:core.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      if (this.getUser() && this.getUser().id != 0) {
        var previousUser = this.getUser();
        this.setUser(null);

        successCallback(previousUser, 200, () => "", null);
        this.$rootScope.$broadcast("USER_CHANGED", [(previousUser)]);
      }
      else {
        errorCallback({ message: "Usuário já saiu" }, 200, () => "", null);
      }
    }

    isLoggedIn():boolean {
      return true;//(this.getUser() != null);
    }

    getUser():User {
      return this.user;
    }

    private setUser(user:User) {
      this.user = user;
    }

  }
}

//auth.module.service("AuthService", auth.AuthServiceMock);
