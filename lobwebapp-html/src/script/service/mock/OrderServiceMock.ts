///<reference path="./../../reference.d.ts"/>

import a = require("./base/EntityServiceMock");

export module service.mock {
    export class OrderServiceMock extends a.service.mock.base.EntityServiceMock<domain.Order> implements d.service.contract.OrderService {

        static $inject = ["$timeout", "_"];
        constructor(public $timeout: ng.ITimeoutService, public _: _<domain.Order>) {
            super($timeout, _);
            super.getRepository().push({
                id: 1, client: { id: 1, firstName: "John", lastName: "Doe" },
                products: [
                    { id: 2, name: "Notebook", description: "Acer Aspire E1-471-6413 Intel Core i3-2328M 2.2 GHz 6144 MB 500 GB", quantity: 1, costPrice: 976.00, price: 1407.12, category: "Informática/Computadores", date: new Date(13, 10, 09), ncm: "8471.30.19" },
                    { id: 7, name: "Tablet", description: "Samsung Galaxy Note N8000 - 3G, Tela 10Pol, Processador Quad Core 1.4Ghz, 16GB, Câmera 5.0MP, Wi-Fi, GPS, Bluetooth", quantity: 1, costPrice: 1530.00, price: 1929.90, category: "Informática/Computadores", date: new Date(1, 5, 13), ncm: "8471.41.90" }
                ],
                date: new Date(), status: { payment: 0, delivery: 0 }
            });

        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("OrderService", service.mock.OrderServiceMock);
};