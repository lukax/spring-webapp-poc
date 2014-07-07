///<reference path="../reference.d.ts"/>

module modularity {
    export class ServiceModule {
        constructor(public profile: string) {
            var mod = angular.module("lwa.service", []);
            	mod .service("AlertService", <Function>service.mock.AlertServiceMock)
                    .service("NavigatorService", <Function>service.impl.NavigatorServiceImpl)
                    .service("Progress", <Function>util.Progress)
                    ;
                    
            if(profile == "dev"){
                mod .service("AuthService", <Function>service.mock.AuthServiceMock);
            }
            else{
                mod .service("AuthService", <Function>service.impl.AuthServiceImpl);
            }
        }

    }
}