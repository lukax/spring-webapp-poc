///<reference path="../../reference.d.ts"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.stock {
    export interface IEditStockController extends i0.controller.base.IEditEntityController<domain.Stock> {
        fetchProduct: (productId: number) => void;
        units: string[];
    }

    export class EditStockController extends i0.controller.base.AbstractEditEntityController<domain.Stock> implements IEditStockController {
        private allUnits: string[] = [];
        units: string[];

        static $inject = ["$scope", "StockService", "ProductService", "AlertService", "$filter"];
        constructor(public $scope: d.controller.base.IAppScope,
                    public StockService: d.service.contract.StockService,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService,
                    public $filter: ng.IFilterService) {
            super($scope, StockService, AlertService, "/stock", "Estoque");

            var stockId = this.$scope.navigator.params().stockId;
            var productId = this.$scope.navigator.params().productId;

            this.findEntity(stockId, ()=>{
                if(productId != null) this.fetchProduct(productId);
                this.fetchUnits();
            });
        }

        fetchProduct(id: number) {
            if(id == null) return;
            this.lock();
            this.ProductService.find(id,
                (successData) => {
                    this.entity.product = successData;
                    this.unlock();
                },
                (errorData) => {
                    console.log(errorData);
                    this.AlertService.addMessageResponse(errorData, "Não foi possível buscar produto");
                    this.unlock();
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

export var register = (module: ng.ILazyModule) => {
    module.controller("EditStockController", controller.stock.EditStockController);
};
