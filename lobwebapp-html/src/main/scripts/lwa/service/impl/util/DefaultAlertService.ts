///<reference path='../../../domain/util/Alert.ts'/>
///<reference path='../../contract/util/AlertService.ts'/>

module lwa.service.impl.util{
    export class DefaultAlertService implements service.contract.util.AlertService {
        private alerts: domain.util.Alert[];        

        constructor(){
            this.alerts = [];
        }

        add(alert: domain.util.Alert){
            if(this.alerts.length >= 2){
                this.alerts.splice(0,1);
            }
            this.alerts.push(alert);

        }
        
        remove(alert: domain.util.Alert){
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
}   