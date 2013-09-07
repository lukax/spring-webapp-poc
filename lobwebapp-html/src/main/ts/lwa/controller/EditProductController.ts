///<reference path='../../DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../domain/Product.ts'/>
///<reference path='../domain/util/Alert.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/contract/util/AlertService.ts'/>

module lwa.controller{
    import domain = lwa.domain;
    
    export interface EditProductViewModel extends ng.IScope {
        alerts: domain.util.Alert[];
        product: domain.Product;
        productPricePattern: RegExp;
        isNewProduct: () => boolean;
        saveChanges: () => void;
        removeProduct: () => void;
        priceInfoModal: () => void;
        nextProduct: () => void;
        previousProduct: () => void;

        productProfitMargin: number;
    }
    
    export class EditProductController {
        private scope: EditProductViewModel;
        private routeParams: any;
        private location: ng.ILocationService;
        private productService: service.contract.ProductService;
        private alertService: service.contract.util.AlertService;
        private modalService: any;
        
        constructor($scope: EditProductViewModel, 
                    $location: ng.ILocationService, 
                    $routeParams: ng.IRouteParamsService,
                    _productService: service.contract.ProductService, 
                    _alertService: service.contract.util.AlertService,
                    $ekathuwa: any){
            this.scope = $scope;
            this.routeParams = $routeParams;
            this.location = $location;
            this.productService = _productService;
            this.alertService = _alertService;
            this.modalService = $ekathuwa;
            
            this.populateScope();
            this.processArgs();
        }
        
        newProduct(){
            this.location.url('product/0');
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
        
        processArgs(){
            if(this.routeParams.productId == 0){ //Gerar produto vazio se id = 0
                this.scope.product = new domain.Product(0,'','',0,0,0);
            }
            else{ //Pegar existente se id != 0
                this.productService.findById(this.routeParams.productId, 
                        (successData, successStatus) => { this.scope.product = successData;  },
                        (errorData, errorStatus)=>{ this.alertService.add(new domain.util.Alert(domain.util.AlertType.danger, 'Código: '+errorStatus, 'Produto com o ID especificado não foi encontrado')); 
                            this.newProduct(); //Manda para /product/0 se id != number ou não existir ID
                    });
            }
        }

        populateScope(){
            this.scope.productPricePattern = /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/;
            this.scope.alerts = this.alertService.list();
            this.scope.isNewProduct = () => { 
                return (this.scope.product.id == 0);
            };
            this.scope.saveChanges = () => { 
                if(this.scope.product.id == 0) this.saveProduct();
                else this.updateProduct();
            };
            this.scope.removeProduct = () => { this.removeProduct(); };
            this.scope.priceInfoModal = () => {
                this.modalService.modal({
                        id: 'findInfoModalId',
                        templateURL: 'views/product/modal/priceInfoModal.html',
                        scope: this.scope
                    });
            };
            this.scope.nextProduct = () => {
                this.location.url('/product/' + String(Number(this.routeParams.productId) + 1)); 
            };
            this.scope.previousProduct = () => {
                var param = Number(this.routeParams.productId) - 1;
                if(param >= 0) this.location.url('/product/' + param); 
                else this.location.url('/product');
            };
            this.scope.$watch('product.price + product.costPrice', () => {
                if(this.scope.product.costPrice != 0)
                    this.scope.productProfitMargin = Math.round(this.scope.product.price / this.scope.product.costPrice * Math.pow(10, 2)) / Math.pow(10, 2);
            });
        }

    }
}