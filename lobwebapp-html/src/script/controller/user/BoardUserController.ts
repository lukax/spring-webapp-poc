///<reference path="./../../reference.d.ts"/>

export module controller.user {
    export interface BoardUserViewModel extends d.controller.base.ViewModel {
        user: domain.User;
    }

    export class BoardUserController implements d.controller.base.Controller{

        static $inject = ['$scope', 'AuthService', 'AlertService'];
        constructor(public $scope: BoardUserViewModel,
                    public AuthService: d.service.contract.AuthService,
                    public AlertService: d.service.contract.util.AlertService) {

            this.processArgs();
            this.populateScope();
        }

        processArgs(){

        }

        populateScope() {
            this.$scope.user = this.AuthService.currentUser();
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller('BoardUserController', controller.user.BoardUserController);
};