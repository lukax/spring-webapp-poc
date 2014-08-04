///<reference path="../reference.d.ts"/>

export module controller {
    export interface IMainNavbarController extends d.controller.base.IController {
        user: domain.User;
        isLoggedIn: boolean;
    }

    export class MainNavbarController implements IMainNavbarController {
        user: domain.User;
        isLoggedIn: boolean;

        static $inject = ["$scope", "AuthService"];
        constructor(public $scope: d.controller.base.IAppScope, 
                    public AuthService: d.service.contract.AuthService) {
            this.$scope.vm = this;
            
            this.retrieveAuthInfo();
        }

        private retrieveAuthInfo(){
            this.user = this.AuthService.getUser();
            this.isLoggedIn = this.AuthService.isLoggedIn();
            
            this.$scope.$on("USER_CHANGED", (event, data: any[]) => {
                this.user = data[0];
                this.isLoggedIn = this.AuthService.isLoggedIn();
                });
        }

    }
}