///<reference path="../reference.ts"/>

var ServiceModule = angular.module("lwa.service", []);

ServiceModule
    .service("AlertService", service.mock.AlertServiceMock)
    .service("NavigatorService", service.impl.NavigatorServiceImpl)
    .service("Progress", util.Progress)

    .service("AuthService", service.mock.AuthServiceMock)
    .service("CustomerService", service.mock.CustomerServiceMock)
    .service("OrderService", service.mock.OrderServiceMock)
    .service("ProductService", service.mock.ProductServiceMock)
    .service("StockService", service.mock.StockServiceMock)
    .service("UserService", service.mock.UserServiceMock)
    ;