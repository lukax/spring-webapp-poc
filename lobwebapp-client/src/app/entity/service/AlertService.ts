///<reference path="../../reference.ts"/>

module entity {
    export interface AlertService {
        add(alert: Alert): Alert;
        addMessageResponse(messageResponse: MessageResponse, title: string): Alert;
        remove(alert: Alert): void;
        removeAll(): void;
        list(): Alert[];
    }
}
