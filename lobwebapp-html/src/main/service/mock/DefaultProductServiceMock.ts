///<reference path='../../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../../domain/base/AbstractEntity.ts'/>
///<reference path='../../domain/Product.ts'/>
///<reference path='../contract/ProductService.ts'/>

module service.mock{
	export class DefaultProductServiceMock extends service.mock.base.AbstractEntityServiceMock<domain.Product> implements service.contract.ProductService {
        
        constructor($timeout: ng.ITimeoutService){
            super($timeout);
            super.getRepository().push(new domain.Product(1,'Vassoura', 15.00, 'Comum', 5));
            super.getRepository().push(new domain.Product(2,'Cabide', 5.99, 'Plastico', 1));
            super.getRepository().push(new domain.Product(3, 'Desodorante', 8.75, 'Axe super fresh', 10));
            super.getRepository().push(new domain.Product(4, 'TV', 1497.99, 'Toshiba 49\'', 75));
        }
        
        public findByName (name : string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
            errorCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
            {
                var items = super.getRepository().filter(function(element){
                    return element.name.toLowerCase() == name.toLowerCase();
                });
                if(items.length != 0)
                    successCallback(items, 200, null, null);
                else
                    errorCallback(null, 404, null, null);
            }                                   
       
        
    }
}