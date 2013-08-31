///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../domain/Product.ts'/>
///<reference path='../domain/util/Alert.ts'/>
///<reference path='../service/contract/ProductService.ts'/>

module controller{
    
    export interface EditProductViewModel extends ng.IScope {
        product: domain.Product;
        btnEsp: () => string; 
        removeProduct: () => void;
        saveChanges: () => void;
        modal: any;
        alerts: domain.util.Alert[];
    }
    
    export class EditProductController {
        private scope: EditProductViewModel;
        private routeParams: any;
        private productService: service.contract.ProductService;
        private location: ng.ILocationService;
        
        constructor($productService: service.contract.ProductService, $scope: EditProductViewModel, 
                    $routeParams: ng.IRouteParamsService, $location: ng.ILocationService, $modal: any){
            this.scope = $scope;
            this.productService = $productService;
            this.routeParams = $routeParams;
            this.location = $location;
            this.scope.modal = $modal;
            this.scope.alerts = [];

            this.retrieveProduct();
            
            this.scope.saveChanges = () => {
                if(this.scope.product.id == 0) this.saveProduct();
                else this.updateProduct();
            };
            this.scope.removeProduct = () => { 
                this.removeProduct()     
            };

            this.scope.btnEsp = () => { 
                if(this.scope.product != null && this.scope.product.id != 0)  return 'inherit'; 
                else return 'none';
            };
        }
        
        
        saveProduct(){
            this.productService.save(this.scope.product,
                        (successData: number, successStatus) => { this.location.url("/product/" + successData);  }, 
                        (errorData, errorStatus) => { this.scope.alerts.push(new domain.util.Alert('error', 'Código: '+errorStatus, 'Produto não pode ser salvado')); });
        }
        
        updateProduct(){
            this.productService.update(this.scope.product,
                        (successData, successStatus) => { this.scope.alerts.push(new domain.util.Alert('success', 'Código: '+successStatus, 'Produto foi atualizado com sucesso'));  }, 
                        (errorData, errorStatus) => { this.scope.alerts.push(new domain.util.Alert('error', 'Código: '+errorStatus, 'Produto não pode ser atualizado')); });
        }

        removeProduct(){
            this.productService.remove(this.scope.product, 
                (successData, successStatus)=> { this.scope.alerts.push(new domain.util.Alert('success', 'Código: '+successStatus, 'Produto removido com sucesso')); }, 
                (errorData, errorStatus) => { this.scope.alerts.push(new domain.util.Alert('error', 'Código: '+errorStatus, 'Produto não pode ser removido')); });                
                this.generateProduct();
        }
        
        retrieveProduct() { //Buscar produto usando ID ou NOME
            if(isNaN(this.routeParams.productId)){
                if(this.routeParams.productId == 'n'){ //Pegar id do usuario
                    this.scope.modal = this.scope.modal({
                        template: 'views/product/partials/retrieveProduct.html',
                        show: true,
                        backdrop: 'static',
                        scope: this.scope
                    });
                }else{ //Buscar produto usando "id" como Nome
                    this.productService.findByName(this.routeParams.productId,
                            (successData, successStatus) => { this.scope.product = successData[0]; },
                            (errorData, errorStatus) => { 
                                this.location.url('/product/n');
                                this.scope.modal.message("ERROR"); });
                }
            }else{
                if(this.routeParams.productId == 0){ //Gerar produto vazio se id = 0
                    this.generateProduct();
                } 
                else{ //Pegar existente se id != 0
                    this.productService.findById(this.routeParams.productId, 
                            (successData, successStatus) => { this.scope.product = successData; },
                            (errorData, errorStatus)=>{ this.location.url('/product/0'); });
                }
            }

            if(this.scope.product == null){//Checagem final se produto nao pode ser pego
                    this.generateProduct();
            }    

        }

        generateProduct(){
            this.scope.product = new domain.Product(0,'',0,'');
        }


    }
}