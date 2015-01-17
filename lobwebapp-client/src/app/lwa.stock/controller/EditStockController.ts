///<reference path="../../reference.d.ts"/>
import abstractEditEntity = require("../../lwa.core/controller/AbstractEditEntityController");
import enumUtil = require("../../lwa.core/util/EnumUtil");

export interface IEditStockController extends abstractEditEntity.IEditEntityController<domain.Stock> {
    fetchProduct: (productId: number) => void;
    units: string[];
}

export class EditStockController extends abstractEditEntity.AbstractEditEntityController<domain.Stock> implements IEditStockController {
    private allUnits: string[] = [];
    units: string[];

    static $inject = ["$scope", "StockService", "ProductService", "AlertService", "$filter"];
    constructor(public $scope: controller.base.IAppScope,
        public StockService: service.contract.StockService,
        public ProductService: service.contract.ProductService,
        public AlertService: service.contract.AlertService,
        public $filter: ng.IFilterService) {
        super($scope, StockService, AlertService, "/stock", "Estoque");

        var stockId = this.$scope.navigator.params().stockId;
        var productId = this.$scope.navigator.params().productId;

        this.findEntity(stockId, () => {
            if (productId != null) this.fetchProduct(productId);
            this.fetchUnits();
        });
    }

    fetchProduct(id: number) {
        if (id == null) return;
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
        this.$scope.$watch("entity.unit", () => {
            this.filterUnits();
        });
    }

    filterUnits() {
        if (this.entity.unit != null)
            this.units = this.$filter("filter")(this.allUnits, this.entity.unit);
    }

}