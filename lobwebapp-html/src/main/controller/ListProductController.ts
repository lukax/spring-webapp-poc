///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>

///<reference path='../domain/Product.ts'/>
///<reference path='../service/contract/ProductService.ts'/>

module controller{
    
    export interface ListProductViewModel extends ng.IScope {
        product : domain.Product;
        showResponse : (message : domain.base.ResponseMessage) => void;
        hideResponse : (message : domain.base.ResponseMessage) => void;
    }
    
    export class ListProductController {
        private scope;
        private productService;
        constructor($scope : ListProductViewModel, $productService : service.contract.ProductService){
            
        }
    
    }
    
}