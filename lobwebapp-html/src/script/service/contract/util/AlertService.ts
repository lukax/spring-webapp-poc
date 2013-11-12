///<reference path="./../../../reference.d.ts"/>

module d.service.contract.util {
    export interface AlertService {
        add(message: string, title?: string, type?: string, time?: Date): domain.util.Alert;
        remove(alert: domain.util.Alert): void;
        removeAll(): void;
        list(): domain.util.Alert[];
    }

    export interface AlertType {
        ok: string;
        info: string;
        warn: string;
        error: string;
    }
}