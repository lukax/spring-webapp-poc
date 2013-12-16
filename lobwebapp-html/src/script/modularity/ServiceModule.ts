///<reference path="../reference.d.ts"/>

import a = require("./../service/mock/AlertServiceMock");
import d = require("./../service/impl/AuthServiceImpl");
import f = require("./../service/impl/NavigationServiceImpl");

export module modularity {
    export class ServiceModule {
        private module: ng.IModule;

        constructor() {
            this.module = angular.module("lwa.service", []);
            this.module.config(["$provide", ($provide: ng.auto.IProvideService) => {
                this.module.lazy = {
                    service: $provide.service
                };
            }]);
        }

        configure() {
            //Global usage services configuration
            this.module
                .service("AuthService", <Function>d.service.impl.AuthServiceImpl)
                .service("AlertService", <Function>a.service.mock.AlertServiceMock)
                .service("NavigationService", <Function>f.service.impl.NavigationServiceImpl)
            ;
            return this;
        }
    }
}