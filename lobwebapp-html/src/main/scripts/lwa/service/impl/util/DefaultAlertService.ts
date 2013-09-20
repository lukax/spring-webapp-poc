///<reference path='../../../domain/util/Alert.ts'/>
///<reference path='../../contract/util/AlertService.ts'/>

import domain_util = require('./../../../domain/util/Alert');
import service_contract = require('./../../contract/util/AlertService');

export class DefaultAlertService implements service_contract.AlertService {
    private alerts: domain_util.Alert[];        

    constructor(){
        this.alerts = [];
    }

    add(alert: domain_util.Alert){
        if(this.alerts.length >= 2){
            this.alerts.splice(0,1);
        }
        this.alerts.push(alert);

    }
        
    remove(alert: domain_util.Alert){
        this.alerts.some((currAlert, index)=>{
            if(alert == currAlert){
                this.alerts.splice(index, 1);
                return true;
            }
        });
    }

    removeAll(){
        this.alerts = [];
    }

    list(){
        return this.alerts;
    }
       
}