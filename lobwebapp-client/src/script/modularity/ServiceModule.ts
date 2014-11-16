///<reference path="../reference.d.ts"/>
import AlertServiceMock = require("../service/mock/AlertServiceMock");
import AuthServiceMock = require("../service/mock/AuthServiceMock");
import CustomerServiceMock = require("../service/mock/CustomerServiceMock");
import OrderServiceMock = require("../service/mock/OrderServiceMock");
import ProductServiceMock = require("../service/mock/ProductServiceMock");
import StockServiceMock = require("../service/mock/StockServiceMock");
import UserServiceMock = require("../service/mock/UserServiceMock");
import Progress = require("../util/Progress");
import AuthServiceImpl = require("../service/impl/AuthServiceImpl");
import CustomerServiceImpl = require("../service/impl/CustomerServiceImpl");
import NavigatorServiceImpl = require("../service/impl/NavigatorServiceImpl");
import OrderServiceImpl = require("../service/impl/OrderServiceImpl");
import ProductServiceImpl = require("../service/impl/ProductServiceImpl");
import StockServiceImpl = require("../service/impl/StockServiceImpl");
import UserServiceImpl = require("../service/impl/UserServiceImpl");

class ServiceModule {
    constructor(public profile: string) {
        var Module = angular.module("lwa.service", []);
        Module
            .service("AlertService", AlertServiceMock)
            .service("NavigatorService", NavigatorServiceImpl)
            .service("Progress", Progress);
        if (profile == "dev") {
            Module
                .service("AuthService", AuthServiceMock)
                .service("CustomerService", CustomerServiceMock)
                .service("OrderService", OrderServiceMock)
                .service("ProductService", ProductServiceMock)
                .service("StockService", StockServiceMock)
                .service("UserService", UserServiceMock);
        }
        else {
            Module
                .service("AuthService", AuthServiceImpl)
                .service("CustomerService", CustomerServiceImpl)
                .service("OrderService", OrderServiceImpl)
                .service("ProductService", ProductServiceImpl)
                .service("StockService", StockServiceImpl)
                .service("UserService", UserServiceImpl);
        }
    }

}
export = ServiceModule;