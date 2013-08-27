///<reference path='base/AbstractEntity.ts'/>

module domain{
    export class Product extends domain.base.AbstractEntity{
        constructor(public id : number, public name: string, public description: string){
            super(id);
        }
    }
}