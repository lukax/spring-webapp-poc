///<reference path="../reference.d.ts"/>

import a = require("./../service/mock/AlertServiceMock");
import b = require("./../service/impl/AuthServiceImpl");
import c = require("./../service/impl/NavigatorServiceImpl");
import d = require("./../util/Progress");

export module modularity {
    export class ServiceModule {
        constructor() {
            angular.module("lwa.service", [])
            	//Global usage services                
                .service("AlertService", <Function>a.service.mock.AlertServiceMock)
                .service("AuthService", <Function>b.service.impl.AuthServiceImpl)
                .service("NavigatorService", <Function>c.service.impl.NavigatorServiceImpl)
                .service("Progress", <Function>d.util.Progress)
                ;
        }

    }
}