///<reference path="./../../reference.d.ts"/>

module d.service.contract.util {
    export interface AlertService {
        add(alert: domain.util.Alert): domain.util.Alert;
        remove(alert: domain.util.Alert): void;
        list(): domain.util.Alert[];
    }
}