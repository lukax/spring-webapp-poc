///<reference path='../../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>

///<reference path='../../domain/base/AbstractEntity.ts'/>
///<reference path='../../domain/Product.ts'/>
///<reference path='../contract/ProductService.ts'/>

module service.mock{
	export class DefaultProductServiceMock extends service.mock.base.AbstractEntityServiceMock<domain.Product> implements service.contract.ProductService {
        
        constructor(){
            super();
            super.getRepository().push(new domain.Product(1,'Vassoura', 15, 'Comum'));
            super.getRepository().push(new domain.Product(2,'Cabide', 5, 'Plastico'));
            super.getRepository().push(new domain.Product(3, 'Desodorante', 8, 'Axe super fresh'));
        }
        
        public findByName (name : string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any, 
            errorCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig)=> any) 
            {
                var items = super.getRepository().filter(function(element){
                    return element.name == name;
                });
                
                successCallback(items, 200, null, null);
            }                                   
       
        
    }
}