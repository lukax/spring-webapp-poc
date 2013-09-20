///<reference path='base/AbstractEntity.ts'/>

import domainBase = require('./base/AbstractEntity');

export class Product extends domainBase.AbstractEntity {
    constructor(public id: number, public name: string, public description: string, public quantity: number, 
                    public costPrice: number, public price: number, public group: string, public ncm: number){
        super(id);

    }

    profitMargin() : number {
        if(this.costPrice != 0)
            return this.price / this.costPrice; 
        return 0;
    }

}