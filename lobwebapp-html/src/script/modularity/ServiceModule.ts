///<reference path="../reference.d.ts"/>

import a = require("./../service/mock/util/AlertServiceMock");
import c = require("./../service/mock/UserServiceMock");
//import d = require("./../service/impl/AuthServiceImpl");
import d = require("./../service/mock/AuthServiceMock");
import f = require("./../service/impl/util/NavigationServiceImpl");

export module modularity {
    export class ServiceModule {
        private module: ng.IModule;

        constructor() {
            this.module = angular.module("lwa.service", ["lwa.util"]);
            this.module.config(["$provide", ($provide: ng.auto.IProvideService) => {
                this.module.lazy = {
                    service: $provide.service
                };
            }]);
        }

        configure() {
            //Global usage services configuration
            this.module
                .service("UserService", <Function>c.service.mock.UserServiceMock)
                .service("AuthService", <Function>d.service.mock.AuthServiceMock)
                .service("AlertService", <Function>a.service.mock.util.AlertServiceMock)
                .service("NavigationService", <Function>f.service.impl.util.NavigationServiceImpl)
            ;
            return this;
        }
    }
}