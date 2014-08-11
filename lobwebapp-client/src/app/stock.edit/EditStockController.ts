///<reference path="../reference.ts"/>

module stock.edit {
    export interface IEditStockController extends core.IEditEntityController<stock.Stock> {
        fetchProduct: (productId: number) => void;
        units: string[];
    }

    export class EditStockController extends core.AbstractEditEntityController<stock.Stock> implements IEditStockController {
        private allUnits: string[] = [];
        units: string[];

        static $inject = ["$scope", "StockService", "ProductService", "AlertService", "$filter", "NavigatorService"];
        constructor(public $scope: core.IAppScope,
                    public StockService: stock.StockService,
                    public ProductService: product.ProductService,
                    public AlertService: core.AlertService,
                    public $filter: ng.IFilterService,
                    public NavigatorService: core.NavigatorService) {
            super($scope, StockService, AlertService, NavigatorService, "/stock", "Estoque");

            var stockId = NavigatorService.params().stockId;
            var productId = NavigatorService.params().productId;

            this.findEntity(stockId, ()=>{
                if(productId != null) this.fetchProduct(productId);
                this.fetchUnits();
            });
        }

        fetchProduct(id: number) {
            if(id == null) return;
            this.ProductService.find(id,
                (successData) => {
                    this.entity.product = successData;
                },
                (errorData) => {
                    console.log(errorData);
                    this.AlertService.addMessageResponse(errorData, "Não foi possível buscar produto");
                });
        }

        fetchUnits() {
            this.StockService.listUnit(
                (successData) => {
                    this.allUnits = successData;
                },
                (errorData) => {
                    console.log(errorData);
                    this.AlertService.addMessageResponse(errorData, "Não foi possível carregar as unidades");
                });
            this.$scope.$watch("entity.unit", ()=>{
                this.filterUnits();
                });
        }

        filterUnits(){
            if(this.entity.unit != null)
                this.units = this.$filter("filter")(this.allUnits, this.entity.unit);
        }

    }
}

stock.edit.module.controller("EditStockController", stock.edit.EditStockController);
