///<reference path="../reference.d.ts"/>

import a = require("./../service/mock/AlertServiceMock");
import b0 = require("./../service/mock/AuthServiceMock");
import b1 = require("./../service/impl/AuthServiceImpl");
import c = require("./../service/impl/NavigatorServiceImpl");
import d = require("./../util/Progress");

export module modularity {
    export class ServiceModule {
        constructor(public profile: string) {
            var mod = angular.module("lwa.service", []);
            	mod .service("AlertService", <Function>a.service.mock.AlertServiceMock)
                    .service("NavigatorService", <Function>c.service.impl.NavigatorServiceImpl)
                    .service("Progress", <Function>d.util.Progress)
                    ;
                    
            if(profile == "dev"){
                mod .service("AuthService", <Function>b0.service.mock.AuthServiceMock);
            }
            else{
                mod .service("AuthService", <Function>b1.service.impl.AuthServiceImpl);
            }
        }

    }
}