///<reference path="../../reference.d.ts"/>

module d.service.contract {
    export interface Navigator {
        Progress: Progress;
        $location: ng.ILocationService;
        $stateParams: any;
    }

    export interface Progress {
        start(): void;
        set(percent: number): void;
        done(): void;
    }
}