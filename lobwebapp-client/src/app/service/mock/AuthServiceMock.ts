///<reference path="../../reference.ts"/>

module service.mock {
  export class AuthServiceMock implements service.contract.AuthService {
    private defaultUser: domain.User = { id: 1, username: "usuario", password: "senha", roles: [], name: "Usuário" };
    private user: domain.User = { id: 0, username: "test", password: "", roles: [], name: "Test" };

    static $inject = ["$timeout", "$rootScope"];
    constructor(public $timeout: ng.ITimeoutService, public $rootScope: ng.IRootScopeService) {

    }

    login(user: domain.User,
        successCallback: (user: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
      this.$timeout(() => {
        if(!this.isLoggedIn() && (this.defaultUser.password === user.password)) {
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

    logout(
        successCallback: (previousUser: domain.User, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
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

    isLoggedIn(): boolean {
      return true;//(this.getUser() != null);
    }

    getUser(): domain.User {
      return this.user;
    }

    private setUser(user: domain.User) {
    	this.user = user;
    }
  }
}

ServiceModule.service("AuthService", service.mock.AuthServiceMock);
