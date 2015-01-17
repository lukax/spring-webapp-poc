///<reference path="../../reference.d.ts"/>
///<amd-dependency path="crossfilter"/>
///<amd-dependency path="d3"/>
///<amd-dependency path="dc"/>
import enumUtil = require("./../../lwa.core/util/EnumUtil");

export interface IGraphOrderController extends controller.base.IController {
}

interface XOrder extends domain.Order {
    dd: Date;
    month: Date;
    total: number;
    productQt: number;
}

export class GraphOrderController implements IGraphOrderController {
    static $inject = ["$scope", "OrderService", "AlertService"];
    constructor(public $scope: controller.base.IAppScope,
        public OrderService: service.contract.OrderService,
        public AlertService: service.contract.AlertService) {
        this.$scope.vm = this;

        this.$scope.navigator.Progress.start();
        this.OrderService.list((successData) => {
            this.buildGraph(successData);
            this.$scope.navigator.Progress.done();
        }, () => { });
    }

    buildGraph(orders: domain.Order[]) {

        var dateFormat = d3.time.format("%m/%d/%Y");
        var numberFormat = d3.format(".2f");
        var daysSinceJanuary = Math.floor((new Date().getTime() - new Date("1/1/" + new Date().getFullYear()).getTime()) * 1 / 1000 * 1 / 60 * 1 / 60 * 1 / 24);

        orders.forEach((o: XOrder) => {
            o.dd = new Date(o.date);
            o.month = d3.time.month(o.dd);
            o.total = 0;
            o.productQt = 0;
            o.items.forEach((item: domain.OrderItem) => {
                o.total += item.product.price * item.quantity;
                o.productQt += item.quantity;
            });
        });

        var data: any = crossfilter(orders);
        var all = data.groupAll();

        var yearlyDimension = data.dimension((d: any) => {
            return d3.time.year(d.dd).getFullYear();
        });
        var yearlyPerformanceGroup = yearlyDimension.group().reduce(
            (p, v: XOrder) => {
                ++p.count;
                p.productQt += v.productQt;
                p.amountEarned += v.total;
                p.avgOrdersPerDay += p.count / daysSinceJanuary;
                return p;
            },
            (p, v: XOrder) => {
                --p.count;
                p.productQt -= v.productQt;
                p.amountEarned -= v.total;
                p.avgOrdersPerDay -= p.count / daysSinceJanuary;
                return p;
            },
            () => {
                return { count: 0, avgOrdersPerDay: 0, amountEarned: 0, productQt: 0 };
            });

        var dateDimension = data.dimension((d: XOrder) => {
            return d.dd;
        });

        var monthDimension = data.dimension((d: XOrder) => {
            return d.month;
        });
        var totalGroupWithinMonth = monthDimension.group().reduceSum((d: XOrder) => {
            return Math.abs(d.total);
        });

        dc.bubbleChart("#year-performance-chart")
            .width(990) // (optional) define chart width, :default = 200
            .height(250)  // (optional) define chart height, :default = 200
            .transitionDuration(1500) // (optional) define chart transition duration, :default = 750
            .margins({ top: 10, right: 50, bottom: 30, left: 40 })
            .dimension(yearlyDimension)
            .group(yearlyPerformanceGroup)
            .elasticY(true)
            .elasticX(true)
            .yAxisPadding(100)
            .xAxisPadding(500)
            .colorAccessor((d) => {
                return d.value.amountEarned;
            })
            .keyAccessor((p) => {
                return p.value.amountEarned;
            })
            .valueAccessor((p) => {
                return p.value.productQt;
            })
            .radiusValueAccessor((p) => {
                return p.value.avgOrdersPerDay;
            })
            .label((p) => {
                return p.key;
            })
            .maxBubbleRelativeSize(0.3)
            .x(d3.scale.linear().domain([0, 100000]))
            .y(d3.scale.linear().domain([0, 100]))
            .r(d3.scale.linear().domain([0, 50]))
            .yAxisPadding(100)
            .xAxisPadding(500)
            .title((p) => {
                return [p.key,
                    "Total ganho: R$ " + numberFormat(p.value.amountEarned),
                    "Total produtos vendidos: " + Math.floor(p.value.productQt) + " unid.",
                    "Media pedidos por dia: " + Math.floor(p.value.avgOrdersPerDay)]
                    .join("\n");
            })
        ;

        var paymentStatusDimension = data.dimension((d: domain.Order) => {
            switch (d.payment.status) {
                case enumUtil.PaymentStatus.OK:
                    return "Pago";
                case enumUtil.PaymentStatus.PENDING:
                    return "Pendente";
                case enumUtil.PaymentStatus.CANCELLED:
                    return "Cancelado";
            }
        });

        var paymentStatusGroup = paymentStatusDimension.group();

        dc.pieChart("#payment-status-chart")
            .width(180) // (optional) define chart width, :default = 200
            .height(180) // (optional) define chart height, :default = 200
            .radius(90) // define pie radius
            .dimension(paymentStatusDimension) // set dimension
            .group(paymentStatusGroup) // set group
            .label((d) => {
                return d.data.key + "(" + Math.floor(d.value / Number(all.value()) * 100) + "%)";
            })
            .title((d) => {
                return "Pagamento: " + d.data.key + " em " + d.value + " pedido(s)";
            })
        ;


        var monthOfYear = data.dimension((d: XOrder) => {
            var month = d.dd.getMonth();
            var name = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
            return month + "." + name[month];
        });
        var monthOfYearGroup = monthOfYear.group();

        dc.pieChart("#month-of-year-chart")
            .width(180) // (optional) define chart width, :default = 200
            .height(180) // (optional) define chart height, :default = 200
            .radius(90) // define pie radius
            .group(monthOfYearGroup)
            .dimension(monthOfYear)
            .innerRadius(40)
            .label((d) => {
                return d.data.key.split(".")[1];
            })
            .title((d) => {
                return d.value + " pedidos em " + d.data.key.split(".")[1];
            })
        ;


        var dayOfWeek = data.dimension((d: XOrder) => {
            var day = d.dd.getDay();
            var name = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
            return day + "." + name[day];
        });
        var dayOfWeekGroup = dayOfWeek.group();

        dc.rowChart("#day-of-week-chart")
            .height(180)
            .margins({ top: 20, left: 10, right: 10, bottom: 20 })
            .group(dayOfWeekGroup)
            .dimension(dayOfWeek)
            .label((d) => {
                return d.key.split(".")[1];
            })
            .title((d) => {
                return d.value + " pedidos em " + d.key.split(".")[1];
            })
            .elasticX(true)
            .xAxis().ticks(4);
        ;


        /*var totalPerDateGroup = dateDimension.group().reduceSum((d)=> {
            return d.total;
        });

        dc.barChart("#orderTotal-per-day")
            .width(420)
            .height(180)
            .margins({top: 10, right: 50, bottom: 30, left: 40})
            .dimension(dateDimension)
            .group(totalPerDateGroup)
            .elasticY(true)
            .centerBar(true)
            .gap(1)
            .x(d3.time.scale().domain([new Date("30/12/2013"), new Date()]))
        ;*/


        dc.renderAll();
    }
}
