///<reference path="./../../../reference.d.ts"/>

module d.service.contract.util {
    export interface NavigationSvc {
        navigate(viewId: string, viewArg?: string): void;

        $routeParams: any;
        $location: ng.ILocationService;
    }
}