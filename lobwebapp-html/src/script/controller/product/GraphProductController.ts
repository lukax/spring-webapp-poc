///<reference path="./../../reference.d.ts"/>
///<amd-dependency path="crossfilter"/>
///<amd-dependency path="d3js"/>
///<amd-dependency path="dcjs"/>

export module controller.product {
    export interface GraphProductViewModel extends d.controller.base.ViewModel {
    }

    export class GraphProductController implements d.controller.base.Controller {
        static $inject = ["$scope", "OrderService", "AlertService"];
        constructor(public $scope: GraphProductViewModel,
                    public OrderService: d.service.contract.OrderService,
                    public AlertService: d.service.contract.AlertService) {
            
            this.$scope.navigator.progress.start();  
            this.OrderService.list((successData) => {
                this.buildGraphs(successData);
                this.$scope.navigator.progress.done();
            }, () => { });
        }
                
        buildGraphs(orders: domain.Order[]){
            var data = crossfilter(orders);
            var orderDimension = data.dimension((d: domain.Order) => {
                    return d.id;
                });
            var orderDimensionDateGroup = orderDimension.group().reduceSum((d: domain.Order) => {
                    return d.date;
                });
            //var idDimension = data.dimension((d: domain.Product) => {
            //        return d.id;
            //    });
            //var idDimensionQtGroup = idDimension.group().reduceSum((d: domain.Product) => {
            //        return d.quantity;
            //});

            var lastOrder = _.last(orders);
            var lastOrderId = 0
            if(lastOrder) lastOrderId = lastOrder.id;

            //var categoryByPrice = dc.rowChart("#dc-category-price", "1");
            //categoryByPrice
            //    .width(900)
            //    .height(150)
            //    .margins({top: 10, right: 10, bottom: 20, left: 40})
            //    .dimension(categoryDimension)
            //    .group(categoryDimensionPriceGroup)
            //    .transitionDuration(500)
            //    .gap(0)
            //    .renderLabel(true)
            //    .title(function(d) { return "Total preço: R$ " + Math.floor(d.value * 100) / 100 ; })
            //    // (optional) whether chart should render titles, :default = false
            //    .renderTitle(true);
            //    //.x(d3.time.scale().domain([new Date(2013, 09, 1), new Date(2013, 09, 31)]))
            //    //.elasticY(true)
            //    //.renderHorizontalGridLines(true)
            //    //.xUnits(d3.time.days)
            //    //.round(d3.time.month.round)
            //    //.xAxis().tickFormat();
            //    ;

            //////

            var nameByPrice = dc.barChart("#dc-name-quantity","2");
            nameByPrice
                .width(900)
                .height(150)
                .margins({ top: 10, right: 10, bottom: 20, left: 40 })
                .dimension(orderDimension)
                .group(orderDimensionDateGroup)
                .transitionDuration(500)
                .centerBar(true)
                .gap(1)
                //.elasticY(true)
                .renderHorizontalGridLines(true)
                .title(function (d) { return "ID: " + Math.floor(d.value); })
                // (optional) whether chart should render titles, :default = false
                .renderTitle(true)
                .xUnits(d3.scale.ordinal())
                .x(d3.scale.linear())
                // .round(d3.time.month.round)
                // .xAxis().tickFormat();
                ;

            //dc.dataTable("#dc-table", "2")
            //    // set dimension
            //    .dimension(idDimension)
            //    // data table does not use crossfilter group but rather a closure
            //    // as a grouping function
            //    .group(function (d) { return d.category; })
            //    // (optional) max number of records to be shown, :default = 25
            //    .size(10)
            //    // dynamic columns creation using an array of closures
            //    .columns([
            //        function (d) { return d.id; },
            //        function (d) { return d.name; },
            //        function (d) { return d.price; },
            //        //function (d) { return Math.floor((d.close - d.open) / d.open * 100) + "%"; },
            //        function (d) { return d.quantity; }
            //    ])
            //    // (optional) sort using the given field, :default = function(d){return d;}
            //    .sortBy(function (d) { return d.id; })
            //    // (optional) sort order, :default ascending
            //    .order(d3.ascending)
            //    ;
            
            
            //dc.renderAll("1");
            dc.renderAll("2");
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("GraphProductController", controller.product.GraphProductController);
};