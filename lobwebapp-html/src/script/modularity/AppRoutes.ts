export interface AppRoute {
    name: string;
    baseUrl?: string;
    url: string;
    abstract?: boolean;
    templateUrl: string;
    controller: string;
    deps: string[];
}

export var routes: AppRoute[] =
    [
        {
            name: "user",
            url: "/user",
            abstract: true,
            templateUrl: "view/user/user.html",
            controller: "",
            deps: []
    }, {
            name: "user.auth",
            baseUrl: "/user",
            url: "/user/auth?logout&error",
            templateUrl: "view/user/authUser.html",
            controller: "AuthUserController",
            deps: [
                "controller/user/AuthUserController",
                "service/impl/AuthServiceImpl"
            ]
        }, {
            name: "product",
            url: "/product",
            abstract: true,
            templateUrl: "view/product/product.html",
            controller: "",
            deps: []
        }, {
            name: "product.list",
            baseUrl: "/product",
            url: "/product/list?search&redirect",
            templateUrl: "view/product/listProduct.html",
            controller: "ListProductController",
            deps: [
                "controller/product/ListProductController",
                "service/impl/ProductServiceImpl",
                "directive/ListPagerDirective"
            ]
        }, {
            name: "product.edit",
            baseUrl: "/product",
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
            name: "order",
            url: "/order",
            abstract: true,
            templateUrl: "view/order/order.html",
            controller: "",
            deps: []
        }, {
            name: "order.edit",
            baseUrl: "/order",
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
                "directive/PaymentDetailDirective",
                "filter/PaymentFilter"
            ]
        }, {
            name: "order.list",
            baseUrl: "/order",
            url: "/order/list?search&redirect",
            templateUrl: "view/order/listOrder.html",
            controller: "ListOrderController",
            deps: [
                "controller/order/ListOrderController",
                "service/impl/OrderServiceImpl",
                "directive/ListPagerDirective"
            ]
        }, {
            name: "order.graph",
            baseUrl: "/order",
            url: "/order/graph",
            templateUrl: "view/order/graphOrder.html",
            controller: "GraphOrderController",
            deps: [
                "controller/order/GraphOrderController",
                "service/impl/OrderServiceImpl"
            ]
        }, {
            name: "customer",
            url: "/customer",
            abstract: true,
            templateUrl: "view/customer/customer.html",
            controller: "",
            deps: []
        }, {
            name: "customer.edit",
            baseUrl: "/customer",
            url: "/customer/{customerId:[0-9]{1,8}|new}",
            templateUrl: "view/customer/editCustomer.html",
            controller: "EditCustomerController",
            deps: [
                "controller/customer/EditCustomerController",
                "service/impl/CustomerServiceImpl",
                "directive/SaveChangesDirective"
            ]
        }, {
            name: "customer.list",
            baseUrl: "/customer",
            url: "/customer/list?search&redirect",
            templateUrl: "view/customer/listCustomer.html",
            controller: "ListCustomerController",
            deps: [
                "controller/customer/ListCustomerController",
                "service/impl/CustomerServiceImpl",
                "directive/ListPagerDirective"
            ]
        }, {
            name: "stock",
            url: "/stock",
            abstract: true,
            templateUrl: "view/stock/stock.html",
            controller: "",
            deps: []
        }, {
            name: "stock.edit",
            baseUrl: "/stock",
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
            name: "stock.list",
            baseUrl: "/stock",
            url: "/stock/list?search&redirect",
            templateUrl: "view/stock/listStock.html",
            controller: "ListStockController",
            deps: [
                "controller/stock/ListStockController",
                "service/impl/StockServiceImpl",
                "directive/ListPagerDirective"
            ]
        }
    ];
