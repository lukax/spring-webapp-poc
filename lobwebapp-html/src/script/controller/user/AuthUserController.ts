///<reference path="../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.user {
    export interface AuthUserViewModel extends d.controller.base.ViewModel {
        user: domain.User;
        lock: boolean;
        login: () => void;
    }

    export class AuthUserController implements d.controller.base.Controller {
        static $inject = ["$scope", "AuthService", "AlertService"];
        constructor(public $scope: AuthUserViewModel,
                    public AuthService: d.service.contract.AuthService,
                    public AlertService: d.service.contract.AlertService) {

            var error = this.$scope.navigator.$stateParams.error;
            var logout = this.$scope.navigator.$stateParams.logout;
            switch (error) {
                case "0":
                    this.AlertService.add({ content: "Login ou senha Inválido", type: enums.AlertType.WARNING });
                    this.AuthService.logout(()=>{}, ()=>{});
                    break;
                case "1":
                    this.AlertService.add({ content: "Usuário não possui permissão para acessar esta página", type: enums.AlertType.WARNING });
                    this.AuthService.logout(()=>{}, ()=>{});
                    break;
            }
            if (logout == "true") {
                this.logout();
            }
            else if (this.AuthService.isLoggedIn()) { 
                // If not logging out, and user is logged in already send him to default page
                this.toDefaultPage();
            }
            
            this.populateScope();
        }

        toDefaultPage(){
            this.$scope.navigator.$location.url("/product/list");
        }

        login() {
            this.lock();
            this.AuthService.login(this.$scope.user,
                (successData) => {
                    this.AlertService.add({ title: "Login", content: "Bem vindo " + successData.name });
                    this.toDefaultPage();
                },
                () => {
                    this.AlertService.add({ title: "Login", content: "Usuário ou senha inválido", type: enums.AlertType.WARNING });
                    this.unlock();
                });
        }

        logout() {
            this.lock();
            this.AuthService.logout(
                (successData) => {
                    this.AlertService.add({ title: "Logout", content: successData.name + " saiu" });
                    this.$scope.user = successData;
                    this.unlock();
                },
                (errorData) => {
                    console.log(errorData);
                    this.AlertService.add({ title: "Logout", content: String(errorData.message), type: enums.AlertType.WARNING });
                    this.unlock();
                });
        }
        
		lock(){
			this.$scope.lock = true;
		}

		unlock(){
			this.$scope.lock = false;
		}

        populateScope() {
            this.$scope.user = { id: 0, username: "", password: "", roles: [], name: "" };
            this.$scope.login = () => this.login();
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("AuthUserController", controller.user.AuthUserController);
};