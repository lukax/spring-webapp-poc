///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='./../../domain/Product.ts'/>
///<reference path='./../../domain/util/Alert.ts'/>
///<reference path='./../../service/contract/ProductService.ts'/>
///<reference path='./../../service/mock/DefaultProductService.ts'/>
///<reference path='./../../service/contract/util/AlertService.ts'/>
///<reference path='./../../util/Std.ts'/>

import domain = require('./../../domain/Product');
import domain_util = require('./../../domain/util/Alert');
import service_mock = require('./../../service/mock/DefaultProductService');
import service_contract_util = require('./../../service/contract/util/AlertService');
import util = require('./../../util/Std');

export interface EditProductViewModel extends ng.IScope {
    product: domain.Product;
    productPricePattern: RegExp;
    productProfitMargin: number;
    productGroups: string[];
    isNewProduct: () => boolean;
    isReadMode: boolean;
    saveChanges: () => void;
    removeProduct: () => void;
    priceInfo: () => void;
    nextProduct: () => void;
    previousProduct: () => void;
}
    
export class EditProductController {
    private scope: EditProductViewModel;
    private routeParams: any;
    private location: ng.ILocationService;
    private productService: service_mock.DefaultProductService;
    private alertService: service_contract_util.AlertService;
    private modalService: any;

    static $inject = ['$scope', '$location', '$routeParams', 'ProductService', 'AlertService', '$ekathuwa'];
    constructor($scope: EditProductViewModel, 
                $location: ng.ILocationService, 
                $routeParams: ng.IRouteParamsService,
                ProductService: service_mock.DefaultProductService,
                AlertService: service_contract_util.AlertService,
                $ekathuwa: any){
        this.scope = $scope;
        this.routeParams = $routeParams;
        this.location = $location;
        this.productService = ProductService;
        this.alertService = AlertService;
        this.modalService = $ekathuwa;

        this.populateScope();
        this.processArgs();
    }
        
    newProduct(){
        this.location.url('/product/new');
    }

    saveProduct(){
        this.productService.save(this.scope.product,
                    (successData: number, successStatus) => { this.alertService.add(new domain_util.Alert(domain_util.AlertType.success, 'Código: '+successStatus, 'Produto foi salvado com sucesso')); 
                        this.location.url("/product/" + successData);
                    }, 
                    (errorData, errorStatus) => { this.alertService.add(new domain_util.Alert(domain_util.AlertType.danger, errorData, 'Produto não pode ser salvado')); 
                });
    }
        
    updateProduct(){
        this.productService.update(this.scope.product,
                    (successData, successStatus) => { this.alertService.add(new domain_util.Alert(domain_util.AlertType.success, 'Código: '+successStatus, 'Produto foi atualizado com sucesso'));  }, 
                    (errorData, errorStatus) => { this.alertService.add(new domain_util.Alert(domain_util.AlertType.danger, errorData, 'Produto não pode ser atualizado')); 
                });
    }

    removeProduct(){
        this.productService.remove(this.scope.product, 
                    (successData, successStatus)=> { this.alertService.add(new domain_util.Alert(domain_util.AlertType.success, 'Código: '+successStatus, 'Produto removido com sucesso')); 
                        this.newProduct(); 
                    }, 
                    (errorData, errorStatus) => { this.alertService.add(new domain_util.Alert(domain_util.AlertType.danger, 'Código: '+errorStatus, 'Produto não pode ser removido')); 
                });
    }

    processArgs() {
        if(this.routeParams.productId == 'new'){
            this.scope.product = new domain.Product(0,'','',0,0,0,'',0);
        }else{
            this.productService.findById(this.routeParams.productId,
                    (successData, successStatus) => { this.scope.product = successData;  },
                    (errorData, errorStatus)=>{ this.alertService.add(new domain_util.Alert(domain_util.AlertType.danger, 'Código: '+errorStatus, 'Produto com o ID especificado não foi encontrado')); 
                        this.newProduct();
                });
        }
        if(this.location.hash() === 'priceInfo'){
            this.modalService.modal({
                    id: 'priceInfoModalId',
                    templateURL: 'views/product/modal/priceInfoModal.html',
                    scope: this.scope,
                    onHidden: () => { this.location.hash(null); this.scope.$apply(); }
                });
        }
    }

    populateScope(){
        this.scope.isReadMode = this.routeParams.mode == 'read';
        this.scope.productPricePattern = /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/;
        this.scope.isNewProduct = () => { 
            return (this.scope.product.id == 0);
        };
        this.scope.saveChanges = () => { 
            if(this.scope.product.id == 0) this.saveProduct();
            else this.updateProduct();
        };
        this.scope.removeProduct = () => { this.removeProduct(); };
        this.scope.priceInfo = () => { this.location.hash('priceInfo'); };
        this.scope.nextProduct = () => {
            this.location.url('/product/' + String(Number(this.routeParams.productId) + 1)); 
        };
        this.scope.previousProduct = () => {
            var param = Number(this.routeParams.productId) - 1;
            if(param >= 0) this.location.url('/product/' + param); 
            else this.location.url('/product');
        };
        this.scope.$watch('product.price + product.costPrice', () => {
            if(this.scope.product.costPrice !== 0)
                this.scope.productProfitMargin = util.Std.round(this.scope.product.profitMargin(), 2);
        });
        this.productService.listGroups((successData, successStatus) => { this.scope.productGroups = successData; }, 
                                        (errorData, errorStatus) => { });
    }

}