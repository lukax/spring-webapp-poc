///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>

///<reference path='../domain/Product.ts'/>
///<reference path='../service/contract/ProductService.ts'/>

module controller{
    
    export interface ListProductViewModel extends ng.IScope {
        product: domain.Product;
        products: domain.Product[];
        statusMessage: string;
        statusNumber: number;

    }
    
    export class ListProductController {
        private scope: ListProductViewModel;
        private productService: service.contract.ProductService;
        
        constructor($scope : ListProductViewModel, $productService: service.contract.ProductService){
            this.scope = $scope;
            this.productService = $productService;
            
            this.listProducts();
        }

        listProducts(){
            this.productService.list(
                (data, status, headers, config) => {
                    this.scope.products = data;
                    this.scope.statusMessage = "success"
                    this.scope.statusNumber = status;
            }, (data, status, headers, config) => {
                this.scope.statusMessage = 'error';
                this.scope.statusNumber = status;
            });
        }

    }
    
}