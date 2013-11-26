///<reference path="./../reference.d.ts"/>

import enums = require("./../util/EnumUtil");

export module controller {
    export interface MainNavbarViewModel extends d.controller.base.ViewModel {
        user: domain.User;
        isUserLogged: boolean;
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
            this.AuthService.logout(
                (successData) => {
                    this.AlertService.add({ title: "Logout", content: this.$scope.user.name + " saiu" });
                    this.$scope.user = successData;
                    this.$scope.navigator.$location.url("/user/auth");
                },
                (errorData, errorStatus) => {
                    this.AlertService.add({ title: "Logout", content: String(errorStatus), type: enums.AlertType.WARNING });
                });
        }

        processArgs() {
            
        }

        populateScope() {
            this.$scope.user = this.AuthService.currentUser();
            this.$scope.logout = () => this.logout();
            this.$scope.$on("USER_CHANGED", (event, data: any[]) => {
                this.$scope.user = data[0];
                this.$scope.isUserLogged = (this.$scope.user.id != 0);
            });
        }

    }
}