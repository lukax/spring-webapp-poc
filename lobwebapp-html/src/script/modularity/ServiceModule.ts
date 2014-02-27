///<reference path="../reference.d.ts"/>

import a = require("./../service/mock/AlertServiceMock");
import b = require("./../service/impl/AuthServiceImpl");
import c = require("./../util/Progress");
import d = require("./../util/Navigator");

export module modularity {
    export class ServiceModule {
        constructor() {
            angular.module("lwa.service", [])
            	//Global usage services                
                .service("AlertService", <Function>a.service.mock.AlertServiceMock)
                .service("AuthService", <Function>b.service.impl.AuthServiceImpl)
                .service("Progress", <Function>c.util.Progress)
                .service("Navigator", <Function>d.util.Navigator)
                ;
        }

    }
}