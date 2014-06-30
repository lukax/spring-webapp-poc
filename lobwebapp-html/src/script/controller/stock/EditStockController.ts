///<reference path="../../reference.d.ts"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.stock {
    export interface EditStockViewModel extends i0.controller.base.EditEntityViewModel<domain.Stock> {
        fetchProduct: (productId: number) => void;
        invalid: any;
        units: string[];
    }

    export class EditStockController extends i0.controller.base.AbstractEditEntityController<domain.Stock> {
        allUnits: string[] = [];

        static $inject = ["$scope", "StockService", "ProductService", "AlertService", "$filter"];
        constructor(public $scope: EditStockViewModel,
                    public StockService: d.service.contract.StockService,
                    public ProductService: d.service.contract.ProductService,
                    public AlertService: d.service.contract.AlertService,
                    public $filter: ng.IFilterService) {
            super($scope, StockService, AlertService, "/stock");
            super.setEntityName("Estoque");
            
            var stockId = this.$scope.navigator.params().stockId;
            var productId = this.$scope.navigator.params().productId;

            this.findEntity(stockId, ()=>{
                if(productId != null) this.fetchProduct(productId);
                this.populateScope();
                this.setupValidations();
            });
        }

        fetchProduct(id: number) {
            if(id == null) return;
            this.lock();
            this.ProductService.find(id,
                (successData) => {
                    this.$scope.entity.product = successData;
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
            if(this.$scope.entity.unit != null)
                this.$scope.units = this.$filter("filter")(this.allUnits, this.$scope.entity.unit);
        }

        setupValidations(){
            this.$scope.invalid = {};
            this.$scope.$watch("entity.quantity", ()=>{
                this.$scope.invalid.quantity = this.$scope.entity.quantity < this.$scope.entity.minQuantity;
                });
            this.$scope.$watch("entity.minQuantity", ()=>{
                this.$scope.invalid.minQuantity = this.$scope.entity.minQuantity >= this.$scope.entity.maxQuantity;
                });
            this.$scope.$watch("entity.maxQuantity", ()=>{
                this.$scope.invalid.maxQuantity = this.$scope.entity.maxQuantity <= this.$scope.entity.minQuantity;
                });
        }

        populateScope() {
            this.$scope.fetchProduct = (productId) => this.fetchProduct(productId);
            this.fetchUnits();
        }
        
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditStockController", controller.stock.EditStockController);
};