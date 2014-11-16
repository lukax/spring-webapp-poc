///<reference path="../reference.d.ts"/>
///<amd-dependency path="angularRoute"/>
import AppRoutes = require("./AppRoutes");
import DependencyManager = require("../util/DependencyManager");
import mainNavbar = require("../controller/MainNavbarController");
import alert = require("../controller/AlertController");
import user = require("../controller/user/AuthUserController");
import editProduct = require("../controller/product/EditProductController");
import listProduct = require("../controller/product/ListProductController");
import editCustomer = require("../controller/customer/EditCustomerController");
import listCustomer = require("../controller/customer/ListCustomerController");
import editOrder = require("../controller/order/EditOrderController");
import listOrder = require("../controller/order/ListOrderController");
import graphOrder = require("../controller/order/GraphOrderController");
import editStock = require("../controller/stock/EditStockController");
import listStock = require("../controller/stock/ListStockController");

class ControllerModule {
    Module: ng.IModule;

    constructor(public profile: string) {
        this.Module = angular.module("lwa.controller", ["ngRoute", "lwa.service"]);
        this.Module
            .config(["$controllerProvider", "$provide", "$compileProvider", "$filterProvider", ($controllerProvider: ng.IControllerProvider, $provide: ng.auto.IProvideService, $compileProvider: ng.ICompileProvider, $filterProvider: ng.IFilterProvider) => {
                this.Module.lazy = {
                    controller: $controllerProvider.register,
                    service: $provide.service,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register
                };
            }])
            .config(["$routeProvider", this.routeProviderCfg])
            .config(["$locationProvider", this.html5Cfg])
            .config(["$httpProvider", this.httpInterceptorsCfg])

            .run(["$rootScope", "NavigatorService", this.scopeVariablesCfg])
            .run(["$rootScope", "$location", "AuthService", "$timeout", this.eventListenersCfg])

            .controller("MainNavbarController", mainNavbar.MainNavbarController)
            .controller("AlertController", alert.AlertController)
            .controller("AuthUserController", user.AuthUserController)
            .controller("EditProductController", editProduct.EditProductController)
            .controller("ListProductController", listProduct.ListProductController)
            .controller("EditCustomerController", editCustomer.EditCustomerController)
            .controller("ListCustomerController", listCustomer.ListCustomerController)
            .controller("EditOrderController", editOrder.EditOrderController)
            .controller("ListOrderController", listOrder.ListOrderController)
            .controller("GraphOrderController", graphOrder.GraphOrderController)
            .controller("EditStockController", editStock.EditStockController)
            .controller("ListStockController", listStock.ListStockController)
        ;
    }

    routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
        AppRoutes.applyProfile(this.profile);

        (<any>$routeProvider).whenAppRoute = (route: AppRoutes.AppRoute) => {
            var resolve = {};
            if (route.secured)
                angular.extend(resolve, this.authenticationResolver());
            //if (route.deps)
            //  angular.extend(resolve, this.dependencyResolver(route.deps));
            return $routeProvider.when(route.url, {
                controller: route.controller,
                templateUrl: route.templateUrl,
                resolve: resolve
            });
        }

      AppRoutes.routes.forEach((x) => {
            (<any>$routeProvider).whenAppRoute(x);
        });

        $routeProvider.otherwise({ redirectTo: AppRoutes.main().url });
    };

    html5Cfg = ($locationProvider: ng.ILocationProvider) => {
        $locationProvider.html5Mode(true);
    };

    eventListenersCfg = ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, AuthService: service.contract.AuthService, $timeout: ng.ITimeoutService) => {
        $rootScope.$on("$routeChangeError", (event: any, current: any, previous: any, rejection: any) => {
            $location.url(AppRoutes.main().errorUrl)
                .search(rejection)
                .replace();
        });
    };

    httpInterceptorsCfg = ($httpProvider) => {
        var logoutUserOn401 = ["$q", "$location", ($q: ng.IQService, $location: ng.ILocationService) => {
        return {
                "responseError": (response) => {
                    if (response.status == 401) {
                        $location.url(AppRoutes.main().errorUrl)
                            .search({ error: 1 })
                            .replace();
                        return $q.reject(response);
                    }
                    if (response.status == 500) {
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            }
      }];
        $httpProvider.interceptors.push(logoutUserOn401);
    }

    scopeVariablesCfg = ($rootScope: controller.base.IAppScope, NavigatorService: service.contract.NavigatorService) => {
        $rootScope.navigator = NavigatorService;
    }

    authenticationResolver() {
      return {
            authentication: ["$q", "AuthService", ($q: ng.IQService, AuthService: service.contract.AuthService) => {
                var deferred = $q.defer();
                if (AuthService.isLoggedIn())
                    deferred.resolve();
                else
                    deferred.reject({ error: 0 });
                return (deferred.promise);
            }]
        }
    }

    dependencyResolver(deps: string[]) {
      return {
            dependencies: ["$q", "$rootScope", "Progress", ($q: ng.IQService, $rootScope: ng.IRootScopeService, Progress: service.contract.Progress) => {
                return (new DependencyManager($q, $rootScope, Progress)).resolve(deps, this.Module.lazy);
            }]
        }
    }
}

export = ControllerModule;