///<reference path="../../reference.ts"/>

module service.mock {
  export class UserServiceMock extends base.PersonServiceMock<domain.User> implements service.contract.UserService {

    static $inject = ["$timeout"];
    constructor(public $timeout:ng.ITimeoutService) {
      super($timeout);

      this.addToRepository({ id: 0, username: "", password: "", roles: [], name: "" });
      this.addToRepository({ id: 1, username: "user", password: "password", roles: ["ROLE_USER"], name: "Lucas Espindola" });
    }

    findByUsername(username:string, successCallback:(data:domain.User, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any, errorCallback:(data:domain.util.MessageResponse, status:number, headers:(headerName:string) => string, config:ng.IRequestConfig) => any) {
      this.$timeout(() => {
        var items = this.getRepository().filter(function (x:domain.User) {
          return x.username.toLowerCase() == username.toLowerCase();
        });
        if (items.length !== 0) successCallback(items[0], 200, () => "", null);
        else errorCallback(null, 404, () => "", null);
      }, 100);
    }
  }
}

ServiceModule.service("UserService", service.mock.UserServiceMock);