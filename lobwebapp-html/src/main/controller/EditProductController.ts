///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../domain/Product.ts'/>
///<reference path='../domain/util/Alert.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/contract/util/AlertService.ts'/>

module controller{
    
    export interface EditProductViewModel extends ng.IScope {
        product: domain.Product;
        saveChanges: () => void;
        removeProduct: () => void;
        isEditable: () => boolean;
        pricePattern: RegExp;
        modal: any; 
        alerts: domain.util.Alert[];
    }
    
    export class EditProductController {
        private scope: EditProductViewModel;
        private routeParams: any;
        private location: ng.ILocationService;
        private productService: service.contract.ProductService;
        private alertService: service.contract.util.AlertService;
        
        constructor($scope: EditProductViewModel, $routeParams: ng.IRouteParamsService, 
                    $location: ng.ILocationService, $modal: any,
                    _productService: service.contract.ProductService, _alertService: service.contract.util.AlertService){
            this.scope = $scope;
            this.routeParams = $routeParams;
            this.location = $location;
            this.scope.modal = $modal;
            this.productService = _productService;
            this.alertService = _alertService;
            //
            this.scope.pricePattern = /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/;
            this.scope.alerts = this.alertService.list();
            //
            this.retrieveProduct();
            this.scope.saveChanges = () => { 
                if(this.scope.product.id == 0) this.saveProduct();
                else this.updateProduct();
            };
            this.scope.removeProduct = () => { 
                this.removeProduct()     
            };
            this.scope.isEditable = () => { 
                if(this.scope.product != null && this.scope.product.id != 0)  return true; 
                return false;
            };
        }
        
        saveProduct(){
            this.productService.save(this.scope.product,
                        (successData: number, successStatus) => { this.alertService.add(new domain.util.Alert(domain.util.AlertType.success, 'Código: '+successStatus, 'Produto foi salvado com sucesso')); 
                            this.location.url("/product/" + successData);
                        }, 
                        (errorData, errorStatus) => { this.alertService.add(new domain.util.Alert(domain.util.AlertType.danger, errorData, 'Produto não pode ser salvado')); 
                    });
        }
        
        updateProduct(){
            this.productService.update(this.scope.product,
                        (successData, successStatus) => { this.alertService.add(new domain.util.Alert(domain.util.AlertType.success, 'Código: '+successStatus, 'Produto foi atualizado com sucesso'));  }, 
                        (errorData, errorStatus) => { this.alertService.add(new domain.util.Alert(domain.util.AlertType.danger, errorData, 'Produto não pode ser atualizado')); 
                    });
        }

        removeProduct(){
            this.productService.remove(this.scope.product, 
                        (successData, successStatus)=> { this.alertService.add(new domain.util.Alert(domain.util.AlertType.success, 'Código: '+successStatus, 'Produto removido com sucesso')); 
                            this.newProduct(); 
                        }, 
                        (errorData, errorStatus) => { this.alertService.add(new domain.util.Alert(domain.util.AlertType.danger, 'Código: '+errorStatus, 'Produto não pode ser removido')); 
                    });
        }
        
        retrieveProduct() { //Buscar produto usando ID ou NOME
            if(isNaN(this.routeParams.productId)){
                if(this.routeParams.productId == 'n'){ //Pegar id do usuario
                    this.scope.modal = this.scope.modal({
                        id: 'retrieveProductModal',
                        template: 'views/product/retrieveProduct.html',
                        show: true,
                        keyboard: false,
                        backdrop: 'static',
                        scope: this.scope
                    });
                }else{ //Buscar produto usando "id" como Nome
                    this.productService.findByName(this.routeParams.productId,
                            (successData, successStatus) => { this.scope.product = successData[0]; },
                            (errorData, errorStatus) => { 
                                this.location.url('/product/n');
                                this.alertService.add(new domain.util.Alert(domain.util.AlertType.danger, 'Código: '+errorStatus, 'Produto com o ID/Nome especificado não foi encontrado'));
                         });
                }
            }else{
                if(this.routeParams.productId == 0){ //Gerar produto vazio se id = 0
                    this.generateProduct();
                } 
                else{ //Pegar existente se id != 0
                    this.productService.findById(this.routeParams.productId, 
                            (successData, successStatus) => { this.scope.product = successData;  },
                            (errorData, errorStatus)=>{ this.alertService.add(new domain.util.Alert(domain.util.AlertType.danger, 'Código: '+errorStatus, 'Produto com o ID especificado não foi encontrado')); 
                                this.newProduct();    
                        });
                }
            } 

        }

        newProduct(){
            this.location.url('product/0');
        }

        generateProduct(){
            this.scope.product = new domain.Product(0,'',0,'',0);
        }


    }
}