export interface AppRoute {
    name: string;
    url: string;
    abstract?: boolean;
    templateUrl: string;
    controller: string;
    deps: string[];
}
export interface MainAppRoute extends AppRoute {
    errorUrl: string;
}

export var main: () => MainAppRoute = () => {
    var mainRoute = "userAuth";
    for(var i = 0; i < routes.length; i++){
        if(routes[i].name == mainRoute)
            return (<MainAppRoute>routes[i]);
    }
}

export var routes: AppRoute[] =
    [
        <MainAppRoute>
        {
            name: "userAuth",
            url: "/user/auth",
            errorUrl: "/user/auth?error=0",
            templateUrl: "view/user/authUser.html",
            controller: "AuthUserController",
            deps: [
                "controller/user/AuthUserController",
                "service/impl/AuthServiceImpl"
            ]
        }, {
            name: "productList",
            url: "/product/list",
            templateUrl: "view/product/listProduct.html",
            controller: "ListProductController",
            deps: [
                "controller/product/ListProductController",
                "service/impl/ProductServiceImpl",
                "directive/ListUtilsDirective"
            ]
        }, {
            name: "productEdit",
            url: "/product/:productId", //0-9 numbers in 1-8 digits long match
            templateUrl: "view/product/editProduct.html",
            controller: "EditProductController",
            deps: [
                "controller/product/EditProductController",
                "service/impl/ProductServiceImpl",
                "directive/FormUtilsDirective",
                "directive/ImageUploadDirective"
            ]
        }, {
            name: "orderGraph",
            url: "/order/graph",
            templateUrl: "view/order/graphOrder.html",
            controller: "GraphOrderController",
            deps: [
                "controller/order/GraphOrderController",
                "service/impl/OrderServiceImpl"
            ]
        }, {
            name: "orderList",
            url: "/order/list",
            templateUrl: "view/order/listOrder.html",
            controller: "ListOrderController",
            deps: [
                "controller/order/ListOrderController",
                "service/impl/OrderServiceImpl",
                "directive/ListUtilsDirective",
                "directive/CustomerDetailDirective",
                "directive/PaymentDetailDirective"
            ]
        }, {
            name: "orderEdit",
            url: "/order/:orderId",
            templateUrl: "view/order/editOrder.html",
            controller: "EditOrderController",
            deps: [
                "controller/order/EditOrderController",
                "service/impl/OrderServiceImpl",
                "service/impl/ProductServiceImpl",
                "service/impl/CustomerServiceImpl",
                "directive/FormUtilsDirective",
                "directive/QuickSearchDirective",
                "directive/CustomerDetailDirective",
                "directive/ProductDetailDirective",
                "directive/PaymentDetailDirective"
            ]
        }, {
            name: "customerList",
            url: "/customer/list",
            templateUrl: "view/customer/listCustomer.html",
            controller: "ListCustomerController",
            deps: [
                "controller/customer/ListCustomerController",
                "service/impl/CustomerServiceImpl",
                "directive/ListUtilsDirective"
            ]
        }, {
            name: "customerEdit",
            url: "/customer/:customerId",
            templateUrl: "view/customer/editCustomer.html",
            controller: "EditCustomerController",
            deps: [
                "controller/customer/EditCustomerController",
                "service/impl/CustomerServiceImpl",
                "directive/FormUtilsDirective"
            ]
        }, {
            name: "stockList",
            url: "/stock/list",
            templateUrl: "view/stock/listStock.html",
            controller: "ListStockController",
            deps: [
                "controller/stock/ListStockController",
                "service/impl/StockServiceImpl",
                "directive/ListUtilsDirective",
                "directive/ProductDetailDirective"
            ]
        }, {
            name: "stockEdit",
            url: "/stock/:stockId",
            templateUrl: "view/stock/editStock.html",
            controller: "EditStockController",
            deps: [
                "controller/stock/EditStockController",
                "service/impl/StockServiceImpl",
                "service/impl/ProductServiceImpl",
                "directive/FormUtilsDirective",
                "directive/QuickSearchDirective",
                "directive/ProductDetailDirective"
            ]
        }
    ];

