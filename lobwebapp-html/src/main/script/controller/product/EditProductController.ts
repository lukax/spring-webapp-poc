///<reference path="./../../reference.d.ts"/>
import a = require('./../../util/StdUtil');

export module controller.product {
    export interface EditProductViewModel extends d.controller.base.ViewModel {
        product: domain.Product;
        productPricePattern: RegExp;
        productProfitMargin: number;
        productGroups: string[];
        isNewProduct: boolean;
        saveChanges: () => void;
        removeProduct: () => void;
        priceInfo: () => void;
    }

    export class EditProductController implements d.controller.base.Controller {
        
        static $inject = ['$scope', 'NavigationService', 'ProductService', 'AlertService', '$ekathuwa'];
        constructor(public $scope: EditProductViewModel,
                    public NavigationSvc: d.service.contract.util.NavigationService,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.util.AlertService,
                    public $ekathuwa: any) {

            this.processArgs();
            this.populateScope();
        }

        newProduct() {
            this.NavigationSvc.$location.url('/product/new');
        }

        saveProduct() {
            this.ProductService.save(this.$scope.product,
                (successData: domain.Product, successStatus) => {
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

        findProduct(prodId: number){
            this.ProductService.findById(prodId,
                (successData, successStatus) => {
                    this.$scope.product = successData;
                },
                (errorData, errorStatus) => {
                    this.AlertService.add('Produto com o ID especificado não foi encontrado', String(errorData), 'warning');
                    this.newProduct();
                });
        }

        priceInfo(){
            this.priceInfoModal();
        }

        priceInfoModal(){
            this.$ekathuwa.modal({
                id: 'priceInfoModalId',
                templateURL: 'view/product/modal/priceInfoModal.html',
                scope: this.$scope,
                onHidden: () => { this.NavigationSvc.$location.search('priceInfo', null); }
            });
        }

        loadProfitMargin() {
            this.$scope.$watch('product.price + product.costPrice', () => {
                if (this.$scope.product != null && this.$scope.product.costPrice !== 0)
                    this.$scope.productProfitMargin = a.util.Std.round(this.$scope.product.price / this.$scope.product.costPrice, 2);
            });
        }

        loadGroups(){
            this.ProductService.listGroups(
                (successData) => { this.$scope.productGroups = successData; },
                (errorData) => { });
        }

        isNewProduct(){
            return (this.$scope.product && this.$scope.product.id == 0);
        }

        processArgs() {
            var routeProdId = this.NavigationSvc.urlParams.productId;
            if(routeProdId > 0){
                this.findProduct(Number(routeProdId));
            }else if(routeProdId == 0){
                this.newProduct();
            }else if(routeProdId == 'new'){
                this.$scope.product = { id:0, name:'s', description:'', quantity: 0, price: 0, costPrice:0, group:'', ncm:0 };
            }else{
                this.AlertService.add('Produto ID Inválido', '', 'warning');
                this.newProduct();
            }
            if (this.NavigationSvc.urlParams.priceInfo == 'true') {
                this.priceInfoModal();
            }
        }

        populateScope() {
            this.$scope.$watch('product', (newValue: domain.Product, oldValue: domain.Product) => {
                    console.log('EditProductController: product object changed');
                    this.$scope.isNewProduct = this.isNewProduct();
                });
            this.$scope.productPricePattern = /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/;
            this.$scope.saveChanges = () => this.saveChanges();
            this.$scope.removeProduct = () => this.removeProduct();
            this.$scope.priceInfo = () => this.priceInfo();
            this.loadProfitMargin();
            this.loadGroups();
        }
    }
}

(<any>angular.module('lwa.controller')).lazy.controller('EditProductController', controller.product.EditProductController);