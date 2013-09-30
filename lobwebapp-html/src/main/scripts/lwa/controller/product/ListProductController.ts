///<reference path="./../../reference.d.ts"/>

export module controller.product {
    export interface ListProductViewModel extends ng.IScope {
        product: domain.Product;
        products: domain.Product[];
        editProduct: (id: number) => void;
        findProduct: (searchText: string) => void;
        gridOptions: any;
    }

    export class ListProductController {

        static $inject = ['$scope', 'NavigationSvc', 'ProductService', 'AlertService', '$ekathuwa'];
        constructor(public $scope: ListProductViewModel,
                    public NavigationSvc: d.service.contract.util.NavigationSvc,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.util.AlertService,
                    public $ekathuwa: any) {

            this.populateScope();
            this.processArgs();
        }

        listProduct() {
            this.ProductService.list(
                (successData, successStatus) => {
                    this.$scope.products = successData;
                },
                (errorData, errorStatus) => {
                    this.AlertService.add('Lista de Produtos não pode ser carregada', String(errorData), 'danger');
                });
        }

        editProduct(id: number) {
            this.NavigationSvc.$location.url('/product/' + id);
        }

        findProduct(searchText?: string) {
            if (!isNaN(Number(searchText))) { this.NavigationSvc.$location.url('/product/' + searchText); }
            else {
                this.ProductService.findByName(searchText,
                    (successData, successStatus) => {
                        this.NavigationSvc.$location.url('/product/' + successData[0].id);
                    },
                    (errorData, errorStatus) => {
                        this.AlertService.add('Produto com o ID/Nome especificado não foi encontrado', String(errorData), 'danger');
                    });
            }
            if (this.findProductModal) this.findProductModal.then((x: any) => { x.modal('hide'); });
        }

        private findProductModal: any;
        processArgs() {
            var findParam = this.NavigationSvc.$routeParams.find;
            if (findParam) { // 'x', '1'
                if (!isNaN(Number(findParam))) { this.NavigationSvc.$location.url('/product/' + findParam); }
                else {
                    this.ProductService.findByName(findParam,
                        (successData, successStatus) => {
                            this.NavigationSvc.$location.url('/product/' + successData[0].id);
                        },
                        (errorData, errorStatus) => {
                            this.AlertService.add('Produto com o ID/Nome especificado não foi encontrado', String(errorData), 'danger');
                        });
                }
            } else if (findParam == '') {
                this.findProductModal = this.$ekathuwa.modal({
                    id: 'findProductModalId',
                    templateURL: 'views/product/modal/findProductModal.html',
                    scope: this.$scope,
                    onHidden: () => { this.NavigationSvc.$location.search('find', null); this.$scope.$apply(); }
                });
            } else {
                this.listProduct();
            }

        }

        populateScope() {
            this.$scope.editProduct = (id: number) => { this.editProduct(id); };
            this.$scope.findProduct = (searchText: string) => { this.findProduct(searchText); }
    }

    }
}