module core{
    export interface AppRoute {
        name: string;
        url: string;
        secured: boolean;
        templateUrl: string;
        controller: string;
    }
    export interface MainAppRoute extends AppRoute {
        errorUrl: string;
    }

    export var mainRoute: () => MainAppRoute = () => {
        var mainRoute = "userAuth";
        for(var i = 0; i < routes.length; i++){
            if(routes[i].name == mainRoute)
                return (<MainAppRoute>routes[i]);
        }
    };

    export var routes: AppRoute[] =
        [
            <MainAppRoute>
            {
                name: "userAuth",
                url: "/user/auth",
                secured: false,
                errorUrl: "/user/auth?error=0",
                templateUrl: "views/user/authUser.html",
                controller: "AuthUserController"
            }, {
                name: "productList",
                url: "/product/list",
                secured: true,
                templateUrl: "views/product/listProduct.html",
                controller: "ListProductController"
            }, {
                name: "productEdit",
                url: "/product/:productId",
                secured: true,
                templateUrl: "views/product/editProduct.html",
                controller: "EditProductController"
            }, {
                name: "orderGraph",
                url: "/order/graph",
                secured: true,
                templateUrl: "views/order/graphOrder.html",
                controller: "GraphOrderController"
            }, {
                name: "orderList",
                url: "/order/list",
                secured: true,
                templateUrl: "views/order/listOrder.html",
                controller: "ListOrderController"
            }, {
                name: "orderEdit",
                url: "/order/:orderId",
                secured: true,
                templateUrl: "views/order/editOrder.html",
                controller: "EditOrderController"
            }, {
                name: "customerList",
                url: "/customer/list",
                secured: true,
                templateUrl: "views/customer/listCustomer.html",
                controller: "ListCustomerController"
            }, {
                name: "customerEdit",
                url: "/customer/:customerId",
                secured: true,
                templateUrl: "views/customer/editCustomer.html",
                controller: "EditCustomerController"
            }, {
                name: "stockList",
                url: "/stock/list",
                secured: true,
                templateUrl: "views/stock/listStock.html",
                controller: "ListStockController"
            }, {
                name: "stockEdit",
                url: "/stock/:stockId",
                secured: true,
                templateUrl: "views/stock/editStock.html",
                controller: "EditStockController"
            }
        ];
}
