///<reference path="./../reference.d.ts"/>

export module controller {
    export interface MainNavbarViewModel extends d.controller.base.ViewModel {
        user: domain.User;
        username: string;
        logout: () => void;
    }

    export class MainNavbarController implements d.controller.base.Controller {

        static $inject = ["$scope", "AuthService", "AlertService", "$rootScope"];
        constructor(public $scope: MainNavbarViewModel,
            public AuthService: d.service.contract.AuthService,
            public AlertService: d.service.contract.util.AlertService,
            public $rootScope: ng.IRootScopeService) {

            this.populateScope();
        }

        logout() {
            this.AuthService.logout(this.$scope.user,
                (successData) => {
                    this.AlertService.add({ title: this.$scope.user.username + " saiu", content: String(successData) });
                    this.$scope.user = successData;
                    this.$scope.navigator.$location.url("/user/auth");
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Não foi possível sair", content: String(errorStatus), type: "warning" });
                });
        }

        temporaryUser() {
            this.$scope.user = { id: 0, username: "", password: "", isLogged: false, roles: [], name: "Visitante" };
        }

        processArgs() {
            
        }

        populateScope() {
            this.temporaryUser();
            this.$scope.logout = () => this.logout();
        }

    }
}