///<reference path='./../../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../domain/Product.ts'/>
///<reference path='./../../domain/util/Alert.ts'/>
///<reference path='./../../service/contract/ProductService.ts'/>
///<reference path='./../../service/contract/util/AlertService.ts'/>

import dom_pr = require('./../../domain/Product');
import svc_ct_ps = require('./../../service/contract/ProductService');
import svc_ct_as = require('./../../service/contract/util/AlertService');

export interface ListProductViewModel extends ng.IScope {
    product: dom_pr.Product;
    products: dom_pr.Product[];
    editProduct: (id: number) => void;
    findProduct: (searchText: string) => void;
    gridOptions: any;
}
    
export class ListProductController {
    private scope: ListProductViewModel;
    private location: ng.ILocationService;
    private routeParams: any;
    private productService: svc_ct_ps.ProductService;
    private alertService: svc_ct_as.AlertService;
    private modalService: any;

    static $inject = ['$scope', '$location', '$routeParams', 'ProductService', 'AlertService', '$ekathuwa'];
    constructor($scope: ListProductViewModel, 
                $location: ng.ILocationService, 
                $routeParams: any,
                ProductService: svc_ct_ps.ProductService,
                AlertService: svc_ct_as.AlertService,
                $ekathuwa: any){
        this.scope = $scope;
        this.location = $location;
        this.routeParams = $routeParams;
        this.productService = ProductService;
        this.alertService = AlertService;
        this.modalService = $ekathuwa;

        this.populateScope();
        this.processArgs();
    }

    listProduct(){
        this.productService.list(
            (successData, successStatus) => {
                this.scope.products = successData;
            },
            (errorData, errorStatus) => {
                this.alertService.add('Lista de Produtos não pode ser carregada', String(errorData), domain.util.AlertType.danger);
            });
    }

    editProduct(id: number){
        this.location.url('/product/' + id);
    }

    findProduct(searchText?: string) { 
        if(!isNaN(Number(searchText))){ this.location.url('/product/'+searchText); }  
        else { 
            this.productService.findByName(searchText,
                (successData, successStatus) => {
                    this.location.url('/product/' + successData[0].id);
                },
                (errorData, errorStatus) => {
                    this.alertService.add('Produto com o ID/Nome especificado não foi encontrado', String(errorData), domain.util.AlertType.danger);
                });
        }
        if(this.findProductModal) this.findProductModal.then((x: any) => {x.modal('hide');});
    }

    private findProductModal: any;
    processArgs(){
        var findParam = this.routeParams.find;
            if(findParam){ // 'x', '1'
            if(!isNaN(Number(findParam))){ this.location.url('/product/'+findParam); }  
            else { 
                this.productService.findByName(findParam,
                    (successData, successStatus) => {
                        this.location.url('/product/' + successData[0].id);
                    },
                    (errorData, errorStatus) => {
                        this.alertService.add('Produto com o ID/Nome especificado não foi encontrado', String(errorData), domain.util.AlertType.danger);
                    });
            }
        }else if(findParam == ''){ 
            this.findProductModal = this.modalService.modal({
                    id: 'findProductModalId',
                    templateURL: 'views/product/modal/findProductModal.html',
                    scope: this.scope,
                    onHidden: () => { this.location.search('find', null); this.scope.$apply(); }
                });
        }else{
            this.listProduct();
        }
            
    }

    populateScope(){
        this.scope.editProduct = (id: number) => { this.editProduct(id); };
        this.scope.findProduct = (searchText: string) => { this.findProduct(searchText); }
    }

}