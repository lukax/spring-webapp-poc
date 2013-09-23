///<reference path='../../../domain/util/Alert.ts'/>
///<reference path='../../contract/util/AlertService.ts'/>

//import dom_al = require('./../../../domain/util/Alert');
import svc_ct_as = require('./../../contract/util/AlertService');

export class DefaultAlertService implements svc_ct_as.AlertService {
    private alerts: domain.util.AlertBlueprint[];        

    constructor(){
        this.alerts = [];
    }

    add(message: string, title?: string, type?: string){
        if(this.alerts.length >= 2){
            this.alerts.splice(0,1);
        }
        var alert: domain.util.AlertBlueprint = {
            type: type ? type : 'success',
            title: title,
            content: message,
            time: new Date()
        };
        this.alerts.push(alert);
        return alert;
    }
        
    remove(alert: domain.util.Alert){
        this.alerts.some((currAlert, index)=>{
            if(alert === currAlert){
                this.alerts.splice(index, 1);
                return true;
            }
            return false;
        });
    }

    removeAll(){
        this.alerts = [];
    }

    list(){
        return this.alerts;
    }
       
}