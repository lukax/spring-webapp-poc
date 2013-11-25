///<reference path="./../../../reference.d.ts"/>

module d.service.contract.util {
    export interface NavigationService {
        progress: Progress;
        navigateTo(url: string): void;
        params(): any;
        $location: ng.ILocationService;
    }

    export interface Progress {
        start: () => void;
        set: (percent: number) => void;
        done: () => void;
    }
}