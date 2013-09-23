///<reference path='../../../domain/util/Alert.ts'/>

import domain_util = require('./../../../domain/util/Alert');

export interface AlertService{
    add: (alert: domain_util.Alert) => void;
    remove: (alert: domain_util.Alert) => void;
    removeAll: () => void;
    list: () => domain_util.Alert[];
}