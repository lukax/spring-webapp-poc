///<reference path="./../../../reference.d.ts"/>

module d.service.contract.util {
    export interface NavigationService {
        navigateTo(url: string);
        navigate(viewId: string, viewArg?: string): void;
        urlParams: any;
        $location: ng.ILocationService;
    }
}