///<reference path="../../reference.d.ts"/>

module d.service.contract {
    export interface NavigatorService {
        Progress: Progress;
        params(): any;
        url(to: string): void;
    }

    export interface Progress {
        start(): void;
        set(percent: number): void;
        done(): void;
    }
}