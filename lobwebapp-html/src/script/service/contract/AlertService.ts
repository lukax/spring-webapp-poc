///<reference path="../../reference.d.ts"/>

module d.service.contract {
    export interface AlertService {
        add(alert: domain.util.Alert): domain.util.Alert;
        addMessageResponse(messageResponse: domain.util.MessageResponse, title: string): domain.util.Alert;
        remove(alert: domain.util.Alert): void;
        list(): domain.util.Alert[];
    }
}