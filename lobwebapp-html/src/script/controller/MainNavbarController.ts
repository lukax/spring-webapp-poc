///<reference path="../reference.d.ts"/>

export module controller {
    export interface MainNavbarViewModel extends d.controller.base.ViewModel {
        user: domain.User;
        isUserLogged: boolean;
    }

    export class MainNavbarController implements d.controller.base.Controller {
        static $inject = ["$scope", "AuthService"];
        constructor(public $scope: MainNavbarViewModel, 
                    public AuthService: d.service.contract.AuthService) {
                        
            this.$scope.$on("USER_CHANGED", (event, data: any[]) => {
                this.$scope.user = data[0];
                this.$scope.isUserLogged = (data[0] != null);
            });
        }

    }
}