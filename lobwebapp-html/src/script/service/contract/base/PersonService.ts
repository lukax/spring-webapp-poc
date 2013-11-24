///<reference path="./../../../reference.d.ts"/>

module d.service.contract.base {
    export interface PersonService<T extends domain.base.Person> extends EntityService<T> {
        
    }
}