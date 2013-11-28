///<reference path="./../reference.d.ts"/>

export module controller {
    export interface MainNavbarViewModel extends d.controller.base.ViewModel {
        user: domain.User;
        isUserLogged: boolean;
    }

    export class MainNavbarController implements d.controller.base.Controller {

        static $inject = ["$scope", "AuthService"];
        constructor(public $scope: MainNavbarViewModel, public AuthService: d.service.contract.AuthService) {
            this.populateScope();
        }

        processArgs() {
        }

        populateScope() {
            this.$scope.$watch("user", (newValue: domain.User) => {
                this.$scope.isUserLogged = (newValue.id != 0);
            });
            this.$scope.$on("USER_CHANGED", (event, data: any[]) => {
                this.$scope.user = data[0];
            });
            this.$scope.user = this.AuthService.getUser();
        }

    }
}