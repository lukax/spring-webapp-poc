///<reference path="./../../reference.d.ts"/>
import a = require('./../../util/Std');

export module controller.product {
    export interface EditProductViewModel extends ng.IScope {
        product: domain.Product;
        productPricePattern: RegExp;
        productProfitMargin: number;
        productGroups: string[];
        isReadMode: () => boolean;
        saveChanges: () => void;
        removeProduct: () => void;
        priceInfo: () => void;
        previousProduct: () => void;
    }

    export class EditProductController {
        
        static $inject = ['$scope', 'NavigationSvc', 'ProductService', 'AlertService', '$ekathuwa'];
        constructor(public $scope: EditProductViewModel,
                    public NavigationSvc: d.service.contract.util.NavigationSvc,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.util.AlertService,
                    public $ekathuwa: any) {

            this.populateScope();
            this.processArgs();
        }

        newProduct() {
            this.NavigationSvc.$location.url('/product/new');
        }

        saveProduct() {
            this.ProductService.save(this.$scope.product,
                (successData: number, successStatus) => {
                    this.AlertService.add('Produto foi salvado com sucesso');
                    this.NavigationSvc.$location.url('/product/'+ String(successData));
                },
                (errorData, errorStatus) => {
                    this.AlertService.add('Produto não pode ser salvado', String(errorData), 'danger');
                });
        }

        updateProduct() {
            this.ProductService.update(this.$scope.product,
                (successData, successStatus) => {
                    this.AlertService.add('Produto foi atualizado com sucesso');
                },
                (errorData, errorStatus) => {
                    this.AlertService.add('Produto não pode ser atualizado', String(errorData), 'danger');
                });
        }

        saveChanges(){
            if (this.$scope.product.id == 0) this.saveProduct();
            else this.updateProduct();
        }

        removeProduct() {
            this.ProductService.remove(this.$scope.product,
                (successData, successStatus) => {
                    this.AlertService.add('Produto removido com sucesso');
                    this.newProduct();
                },
                (errorData, errorStatus) => {
                    this.AlertService.add('Produto não pode ser removido', String(errorData), 'danger');
                });
        }

        processArgs() {
            if (this.NavigationSvc.$routeParams.productId == 'new') {
                //this.$scope.product = { id:0, name:'', description:'', quantity: 0, price: 0, costPrice:0, group:'', ncm:0 };
            } else {
                this.ProductService.findById(this.NavigationSvc.$routeParams.productId,
                    (successData, successStatus) => {
                        this.$scope.product = successData;
                    },
                    (errorData, errorStatus) => {
                        this.AlertService.add('Produto com o ID especificado não foi encontrado', String(errorData), 'warning');
                        this.newProduct();
                    });
            }
            if (this.NavigationSvc.$location.hash() == 'priceInfo') {
                this.$ekathuwa.modal({
                    id: 'priceInfoModalId',
                    templateURL: 'views/product/modal/priceInfoModal.html',
                    scope: this.$scope,
                    onHidden: () => { this.NavigationSvc.$location.hash(null); this.$scope.$apply(); }
                });
            }
        }

        getProfitMargin() {
            this.$scope.$watch('product.price + product.costPrice', () => {
                if (this.$scope.product.costPrice !== 0)
                    this.$scope.productProfitMargin = a.util.Std.round(this.$scope.product.price / this.$scope.product.costPrice, 2);
            });
        }

        getGroups(){
            this.ProductService.listGroups(
                (successData, successStatus) => { this.$scope.productGroups = successData; },
                (errorData, errorStatus) => { });
        }

        isReadMode(){
            return (this.$scope.product.id == 0);
        }

        populateScope() {
            this.$scope.product = { id:0, name:'', description:'', quantity: 0, price: 0, costPrice:0, group:'', ncm:0 };
            this.$scope.productPricePattern = /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/;
            this.$scope.isReadMode = () => this.isReadMode();
            this.$scope.saveChanges = () => this.saveChanges();
            this.$scope.removeProduct = () => this.removeProduct();
            this.$scope.priceInfo = () => this.NavigationSvc.$location.hash('priceInfo');
            this.$scope.previousProduct = () => {
                var param = Number(this.NavigationSvc.$routeParams.productId) - 1;
                if (param >= 0) this.NavigationSvc.$location.url('/product/' + param);
                else this.NavigationSvc.$location.url('/product');
            };
            this.getProfitMargin();
            this.getGroups();
        }
    }
}