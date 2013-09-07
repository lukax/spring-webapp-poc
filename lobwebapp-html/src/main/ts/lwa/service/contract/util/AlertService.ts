///<reference path='../../../../DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../../../domain/util/Alert.ts'/>

module lwa.service.contract.util{
    import domain = lwa.domain;

    export interface AlertService{
        add: (alert: domain.util.Alert) => void;
        remove: (alert: domain.util.Alert) => void;
        removeAll: () => void;
        list: () => domain.util.Alert[];
    }
}