///<reference path='../../../domain/util/Alert.ts'/>

module lwa.service.contract.util{
    export interface AlertService{
        add: (alert: domain.util.Alert) => void;
        remove: (alert: domain.util.Alert) => void;
        removeAll: () => void;
        list: () => domain.util.Alert[];
    }
}