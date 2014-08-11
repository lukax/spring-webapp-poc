///<reference path="../reference.ts"/>

module auth {
  export interface IAuthUserController extends core.IController {
    user: User;
    lock: boolean;
    login: () => void;
  }

  export class AuthUserController implements IAuthUserController {
    user:User = { id: 0, username: "", password: "", roles: [], name: "" };
    lock:boolean;

    static $inject = ["$scope", "AuthService", "AlertService", "NavigatorService"];
    constructor(public $scope:core.IAppScope,
                public AuthService:AuthService,
                public AlertService:core.AlertService,
                public NavigatorService:core.NavigatorService) {
      this.$scope.vm = this;

      this.processParams();
    }

    login() {
      this.lock = true;
      this.AuthService.login(this.user,
        (successData) => {
          this.toDefaultPage();
        },
        () => {
          this.AlertService.add({ title: "Login", content: "Usuário ou senha inválido", type: core.AlertType.WARNING });
          this.lock = false;
        });
    }

    logout() {
      this.lock = true;
      this.AuthService.logout(
        (successData) => {
          this.user = successData;
          this.lock = false;
        },
        (errorData) => {
          console.log(errorData);
          this.AlertService.add({ title: "Logout", content: String(errorData.message), type: core.AlertType.WARNING });
          this.lock = false;
        });
    }

    toDefaultPage() {
      this.NavigatorService.url("/product/list");
    }

    private processParams() {
      var error = this.NavigatorService.params().error;
      var logout = this.NavigatorService.params().logout;

      switch (String(error)) {
        case "0":
          this.AlertService.add({ content: "Login ou senha Inválido", type: core.AlertType.WARNING });
          this.AuthService.logout(()=> {
          }, ()=> {
          });
          break;
        case "1":
          this.AlertService.add({ content: "Você não possui permissão para acessar esta página", type: core.AlertType.WARNING });
          this.AuthService.logout(()=> {
          }, ()=> {
          });
          break;
      }

      if (logout) {
        this.logout();
      }
      else if (this.AuthService.isLoggedIn()) {
        // If not logging out, and user is logged in already send him to default page
        this.toDefaultPage();
      }
    }

  }
}

auth.module.controller("AuthUserController", auth.AuthUserController);
