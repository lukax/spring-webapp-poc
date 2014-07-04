///<reference path="../reference.d.ts"/>

export module controller {
    export interface IMainNavbarController extends d.controller.base.IController {
        user: domain.User;
        isUserLogged: boolean;
    }

    export class MainNavbarController implements IMainNavbarController {
        user: domain.User;
        isUserLogged: boolean;

        static $inject = ["$scope", "AuthService"];
        constructor(public $scope: d.controller.base.IAppScope, 
                    public AuthService: d.service.contract.AuthService) {
                        
            this.$scope.$on("USER_CHANGED", (event, data: any[]) => {
                this.user = data[0];
                this.isUserLogged = (data[0] != null);
            });
        }

    }
}