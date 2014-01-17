///<reference path="./../../reference.d.ts"/>

import a = require("./base/EntityServiceMock");

export module service.mock {
    export class OrderServiceMock extends a.service.mock.base.EntityServiceMock<domain.Order> implements d.service.contract.OrderService {

        static $inject = ["$timeout"];
        constructor(public $timeout: ng.ITimeoutService) {
            super($timeout);

            this.addToRepository({
                id: 1, customer: { id: 1, name: "John Doe" }, date: new Date(13, 11, 1).getTime(), payment: { id: 1, quantity: 3400, mode: "CREDIT_CARD", status: "OK" },
                items: [
                    { quantity: 1, product: { id: 2, name: "Notebook", description: "Acer Aspire E1-471-6413 Intel Core i3-2328M 2.2 GHz 6144 MB 500 GB", costPrice: 976.00, price: 1407.12, category: "Informática/Computadores", registerDate: new Date(13, 10, 09).getTime(), ncm: "8471.30.19" } },
                    { quantity: 2, product: { id: 7, name: "Tablet", description: "Samsung Galaxy Note N8000 - 3G, Tela 10Pol, Processador Quad Core 1.4Ghz, 16GB, Câmera 5.0MP, Wi-Fi, GPS, Bluetooth", costPrice: 1530.00, price: 1929.90, category: "Informática/Computadores", registerDate: new Date(1, 5, 13).getTime(), ncm: "8471.41.90" } }
                ],
            });
            this.addToRepository({
                id: 2, customer: { id: 2, name: "Jane Doe" }, date: new Date(13, 11, 2).getTime(), payment: { id: 2, quantity: 3400, mode: "MONEY", status: "OK" },
                items: [
                    { quantity: 2, product: { id: 4, name: "Memória", description: "Markvision KMM2GBD3-1333 2048 MB PC DDR3 1333 MHz", costPrice: 27.32, price: 25.10, category: "Informática/Componentes", registerDate: new Date(11, 4, 9).getTime(), ncm: "8473.30.42" } },
                    { quantity: 3, product: { id: 5, name: "SSD", description: "Kingston SSDNow E100 SE100S37 100 GB Interno", costPrice: 1035.00, price: 1388.82, category: "Informática/Armazenamento", registerDate: new Date(12, 5, 10).getTime(), ncm: "8473.30.99" } }
                ],
            });
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("OrderService", service.mock.OrderServiceMock);
};