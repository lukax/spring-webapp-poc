///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../domain/Product.ts'/>
///<reference path='../service/contract/ProductService.ts'/>

module controller{
    
    export interface EditProductViewModel extends ng.IScope {
        product : domain.Product;
        showResponse : (message : domain.base.ResponseMessage) => void;
        hideResponse : (message : domain.base.ResponseMessage) => void;
    }
    
    export class EditProductController {
        private scope;
        private productService;
        constructor($scope : EditProductViewModel, $productService : service.contract.ProductService){
            
        }
    
    }
    
}