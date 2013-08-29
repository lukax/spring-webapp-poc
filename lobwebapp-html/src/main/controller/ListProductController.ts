///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>

///<reference path='../domain/Product.ts'/>
///<reference path='../service/contract/ProductService.ts'/>

module controller{
    
    export interface ListProductViewModel extends ng.IScope {
        product: domain.Product;
        products: domain.Product[];
        message: string;
        status: number;
    }
    
    export class ListProductController {
        public scope: ListProductViewModel;
        public productService: service.contract.ProductService;
        
        constructor($scope : ListProductViewModel, $productService: service.contract.ProductService){
            //this.scope = $scope;
            //this.productService = $productService;
            
            $scope.product = new domain.Product(0,'',0,'');
            $productService.list(
                function(data, status, headers, config){
                    $scope.products = data;
                    $scope.status = status;
            }, function(data, status, headers, config){
                $scope.message = 'Error!';
            });
            $scope.message = 'Ok';
        }
    
    }
    
}