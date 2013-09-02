///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../domain/Product.ts'/>
///<reference path='../domain/util/Alert.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/contract/util/AlertService.ts'/>

module controller{
    
    export interface ListProductViewModel extends ng.IScope {
        product: domain.Product;
        products: domain.Product[];
        editProduct: (id: number) => void;
        alerts: domain.util.Alert[];
    }
    
    export class ListProductController {
        private scope: ListProductViewModel;
        private location: ng.ILocationService;
        private productService: service.contract.ProductService;
        private alertService: service.contract.util.AlertService;

        constructor($scope: ListProductViewModel, $location: ng.ILocationService, 
                    _productService: service.contract.ProductService, _alertService: service.contract.util.AlertService){
            this.scope = $scope;
            this.location = $location;
            this.productService = _productService;
            this.alertService = _alertService;
            //
            this.scope.editProduct = (id: number) => { this.editProduct(id); };
            this.scope.alerts = this.alertService.list();
            //
            this.listProducts();
        }

        listProducts(){
            this.productService.list(
                (successData, successStatus) => {
                    this.scope.products = successData;
            }, (errorData, errorStatus) => {
                    this.alertService.add(new domain.util.Alert(domain.util.AlertType.danger, 'Código: '+errorStatus, 'Lista de Produtos não pode ser carregada'));
            });
        }

        editProduct(id: number){
            this.location.url('/product/' + id);
        }
    }
    
}