///<reference path='base/AbstractEntity.ts'/>

module lwa.domain{
	import domain = lwa.domain;
    
    export class Product extends domain.base.AbstractEntity{
        private profitMargin: number;

        constructor(public id: number, public name: string, public description: string, public quantity: number, 
                        public costPrice: number, public price: number){
            super(id);

        }

        get ProfitMargin() : number{
            if(this.costPrice != 0)
                return this.price / this.costPrice; 
            return 0;
        }

    }
}