///<reference path="./../../../reference.d.ts"/>

module d.service.contract.util {
    export interface NavigationService {
        progress: Progress;
        navigateTo(url: string);
        navigate(viewId: string, viewArg?: string): void;
        urlParams: any;
        $location: ng.ILocationService;
    }

    export interface Progress {
        start: () => void;
        set: (percent: number) => void;
        done: () => void;
    }
}