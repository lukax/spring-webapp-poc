///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../domain/Product.ts'/>

module controller{
    
    export interface ProductViewModel extends ng.IScope {
        product : domain.Product;
        showResponse : (message : domain.base.ResponseMessage) => void;
        hideResponse : (message : domain.base.ResponseMessage) => void;
        //crudState : string;
    }
    
    export class ProductController {
        private scope;
        //private http SERVICO
        constructor($scope : ProductViewModel, $http : ng.IHttpService){
            
        }
    
    }
    
}