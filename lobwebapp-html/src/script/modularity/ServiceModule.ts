///<reference path="../reference.d.ts"/>

import a = require("./../service/mock/AlertServiceMock");
import d = require("./../service/impl/AuthServiceImpl");
import f = require("./../service/impl/NavigationServiceImpl");

export module modularity {
    export class ServiceModule {
        constructor() {
            var mod = angular.module("lwa.service", []);

            mod .config(["$provide", ($provide: ng.auto.IProvideService) => {
                    mod.lazy = {
                        service: $provide.service
                    };
                }]) 

                .service("AuthService", <Function>d.service.impl.AuthServiceImpl)
                .service("AlertService", <Function>a.service.mock.AlertServiceMock)
                .service("NavigationService", <Function>f.service.impl.NavigationServiceImpl)
            
                ;
        }

    }
}