///<reference path="../../reference.ts"/>

module controller.user {
  export interface IAuthUserController extends controller.base.IController {
    user: domain.User;
    lock: boolean;
    login: () => void;
  }

  export class AuthUserController implements IAuthUserController {
    user:domain.User = { id: 0, username: "", password: "", roles: [], name: "" };
    lock:boolean;

    static $inject = ["$scope", "AuthService", "AlertService"];
    constructor(public $scope:controller.base.IAppScope,
                public AuthService:service.contract.AuthService,
                public AlertService:service.contract.AlertService) {
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
          this.AlertService.add({ title: "Login", content: "Usuário ou senha inválido", type: util.AlertType.WARNING });
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
          this.AlertService.add({ title: "Logout", content: String(errorData.message), type: util.AlertType.WARNING });
          this.lock = false;
        });
    }

    toDefaultPage() {
      this.$scope.navigator.url("/product/list");
    }

    private processParams() {
      var error = this.$scope.navigator.params().error;
      var logout = this.$scope.navigator.params().logout;

      switch (String(error)) {
        case "0":
          this.AlertService.add({ content: "Login ou senha Inválido", type: util.AlertType.WARNING });
          this.AuthService.logout(()=> {
          }, ()=> {
          });
          break;
        case "1":
          this.AlertService.add({ content: "Você não possui permissão para acessar esta página", type: util.AlertType.WARNING });
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

ControllerModule.controller("AuthUserController", controller.user.AuthUserController);
