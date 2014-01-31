///<reference path="../../reference.d.ts"/>

module d.service.contract {
    export interface NavigationService {
        progress: Progress;
        navigateTo(url: string): void;
        params(): any;
    }

    export interface Progress {
        start(): void;
        set(percent: number): void;
        done(): void;
    }
}