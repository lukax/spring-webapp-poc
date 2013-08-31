///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../domain/Product.ts'/>
///<reference path='../domain/util/Alert.ts'/>
///<reference path='../service/contract/ProductService.ts'/>

module controller{
    
    export interface ListProductViewModel extends ng.IScope {
        product: domain.Product;
        products: domain.Product[];
        editProduct: (id: number) => void;
        alerts: domain.util.Alert[];
    }
    
    export class ListProductController {
        private scope: ListProductViewModel;
        private productService: service.contract.ProductService;
        private location: ng.ILocationService;

        constructor($scope: ListProductViewModel, $productService: service.contract.ProductService, 
                    $location: ng.ILocationService){
            this.scope = $scope;
            this.location = $location;
            this.productService = $productService;
            this.scope.editProduct = (id: number) => { this.editProduct(id); };
            this.scope.alerts = [];

            this.listProducts();
        }

        listProducts(){
            this.productService.list(
                (successData, successStatus) => {
                    this.scope.products = successData;
                    this.scope.alerts.push(new domain.util.Alert('success', String(successStatus), 'Lista de Produtos carregada com sucesso'));
            }, (errorData, errorStatus) => {
                this.scope.alerts.push(new domain.util.Alert('error', String(errorStatus), 'Lista de Produtos não pode ser carregada'));
            });
        }

        editProduct(id: number){
            this.location.url('/product/' + id);
        }
    }
    
}