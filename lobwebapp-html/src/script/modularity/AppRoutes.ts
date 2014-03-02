export interface AppRoute {
    name: string;
    url: string;
    abstract?: boolean;
    templateUrl: string;
    controller: string;
    deps: string[];
}

export var routes: AppRoute[] =
    [
        {
            name: "userAuth",
            url: "/user/auth?logout&error",
            templateUrl: "view/user/authUser.html",
            controller: "AuthUserController",
            deps: [
                "controller/user/AuthUserController",
                "service/impl/AuthServiceImpl"
            ]
        }, {
            name: "productList",
            url: "/product/list?search&redirect",
            templateUrl: "view/product/listProduct.html",
            controller: "ListProductController",
            deps: [
                "controller/product/ListProductController",
                "service/impl/ProductServiceImpl",
                "directive/ListPagerDirective"
            ]
        }, {
            name: "productEdit",
            url: "/product/{productId:[0-9]{1,8}|new}", //0-9 numbers in 1-8 digits long match
            templateUrl: "view/product/editProduct.html",
            controller: "EditProductController",
            deps: [
                "controller/product/EditProductController",
                "service/impl/ProductServiceImpl",
                "directive/ImageUploadDirective",
                "directive/SaveChangesDirective"
            ]
        }, {
            name: "orderEdit",
            url: "/order/{orderId:[0-9]{1,8}|new}?customerId&productId", //0-9 numbers in 1-8 digits long match
            templateUrl: "view/order/editOrder.html",
            controller: "EditOrderController",
            deps: [
                "controller/order/EditOrderController",
                "service/impl/OrderServiceImpl",
                "service/impl/ProductServiceImpl",
                "service/impl/CustomerServiceImpl",
                "directive/SaveChangesDirective",
                "directive/QuickSearchDirective",
                "directive/CustomerDetailDirective",
                "directive/ProductDetailDirective",
                "directive/PaymentDetailDirective"
            ]
        }, {
            name: "orderList",
            url: "/order/list?search&redirect",
            templateUrl: "view/order/listOrder.html",
            controller: "ListOrderController",
            deps: [
                "controller/order/ListOrderController",
                "service/impl/OrderServiceImpl",
                "directive/ListPagerDirective",
                "directive/PaymentDetailDirective"
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
            name: "customerEdit",
            url: "/customer/{customerId:[0-9]{1,8}|new}",
            templateUrl: "view/customer/editCustomer.html",
            controller: "EditCustomerController",
            deps: [
                "controller/customer/EditCustomerController",
                "service/impl/CustomerServiceImpl",
                "directive/SaveChangesDirective"
            ]
        }, {
            name: "customerList",
            url: "/customer/list?search&redirect",
            templateUrl: "view/customer/listCustomer.html",
            controller: "ListCustomerController",
            deps: [
                "controller/customer/ListCustomerController",
                "service/impl/CustomerServiceImpl",
                "directive/ListPagerDirective"
            ]
        }, {
            name: "stockEdit",
            url: "/stock/{stockId:[0-9]{1,8}|new}?productId",
            templateUrl: "view/stock/editStock.html",
            controller: "EditStockController",
            deps: [
                "controller/stock/EditStockController",
                "service/impl/StockServiceImpl",
                "service/impl/ProductServiceImpl",
                "directive/SaveChangesDirective",
                "directive/QuickSearchDirective",
                "directive/ProductDetailDirective"
            ]
        }, {
            name: "stockList",
            url: "/stock/list?search&redirect",
            templateUrl: "view/stock/listStock.html",
            controller: "ListStockController",
            deps: [
                "controller/stock/ListStockController",
                "service/impl/StockServiceImpl",
                "directive/ListPagerDirective",
                "directive/ProductDetailDirective"
            ]
        }
    ];
