///<reference path="../../../reference.d.ts"/>

module service.contract.base {
    export interface PersonService<T extends domain.base.Person> extends EntityService<T> {
        
    }
}