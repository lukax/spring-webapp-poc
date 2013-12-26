///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.user {
    export interface AuthUserViewModel extends d.controller.base.ViewModel {
        user: domain.User;
        lock: boolean;
        login: () => void;
    }

    export class AuthUserController implements d.controller.base.Controller {

        static $inject = ["$scope", "AuthService", "AlertService", "NavigationService"];
        constructor(public $scope: AuthUserViewModel,
                    public AuthService: d.service.contract.AuthService,
                    public AlertService: d.service.contract.AlertService,
                    public NavigationService: d.service.contract.NavigationService) {
            this.populateScope();
            this.processArgs();
        }

        login() {
            this.lock();
            this.AuthService.login(this.$scope.user,
                (successData) => {
                    this.NavigationService.navigateTo("/product/list");
                    this.AlertService.add({ title: "Login", content: "Bem vindo " + successData.name });
                    this.unlock();
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
                (errorData, errorStatus) => {
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

        processArgs() {
            var error = this.NavigationService.params().error;
            var logout = this.NavigationService.params().logout;
            switch (error) {
                case "0":
                    this.AlertService.add({ content: "Login ou senha Inválido", type: enums.AlertType.WARNING });
                    this.AuthService.logout(()=>{}, ()=>{});
                    break;
                case "1":
                    this.AlertService.add({ content: "Usuário não possui permissão para acessar esta página", type: enums.AlertType.WARNING });
                    this.AuthService.logout(()=>{}, ()=>{});
                    break;
                default:
                    if (this.AuthService.isLoggedIn()) {
                        this.NavigationService.navigateTo("/product/list");
                    }
                    break;
            }

            if (logout == "true") {
                this.logout();
            }
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