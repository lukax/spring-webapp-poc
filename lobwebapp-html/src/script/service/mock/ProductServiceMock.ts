///<reference path="./../../reference.d.ts"/>

import a = require("./base/EntityServiceMock");

export module service.mock {
    export class ProductServiceMock extends a.service.mock.base.EntityServiceMock<domain.Product> implements d.service.contract.ProductService {

        static $inject = ["$timeout", "_"];
        constructor(public $timeout: ng.ITimeoutService, public _: _<domain.Product>) {
            super($timeout, _);
            super.getRepository().push({ id: 1, name: "Notebook", description: "Dell Inspiron 15R Special Edition Intel Core i5-3230M 2.6 GHz 6144 MB 750 GB", quantity: 9, costPrice: 2102.30, price: 2699.00, category: "Informática/Computadores", date: new Date(12,12,12), ncm: "8471.30.19"});
            super.getRepository().push({ id: 2, name: "Notebook", description: "Acer Aspire E1-471-6413 Intel Core i3-2328M 2.2 GHz 6144 MB 500 GB", quantity: 13, costPrice: 976.00, price: 1407.12, category: "Informática/Computadores", date: new Date(13,10,09), ncm: "8471.30.19"});
            super.getRepository().push({ id: 3, name: "Memória", description: "Kingston KVR1333D3N9 8192 MB PC DDR3 1333 MHz", quantity: 34, costPrice: 76.34, price: 143.75, category: "Informática/Componentes", date: new Date(13,07,15), ncm: "8473.30.42"});
            super.getRepository().push({ id: 4, name: "Memória", description: "Markvision KMM2GBD3-1333 2048 MB PC DDR3 1333 MHz", quantity: 27, costPrice: 27.32, price: 25.10, category: "Informática/Componentes", date: new Date(11,04,09), ncm: "8473.30.42"});
            super.getRepository().push({ id: 5, name: "SSD", description: "Kingston SSDNow E100 SE100S37 100 GB Interno", quantity: 6, costPrice: 1035.00, price: 1388.82, category: "Informática/Armazenamento", date: new Date(12,05,10), ncm: "8473.30.99"});
            super.getRepository().push({ id: 6, name: "Desktop", description: "Dell Vostro Slim 260 com Intel Core i3, Memoria 8GB, HD 500GB, Gravador DVD, Leitor de Cartões e Windows 7 Pro 64 e Antivirus", quantity: 3, costPrice: 1380.00, price: 1599.99, category: "Informática/Computadores", date: new Date(12,12,12), ncm: "8471.50.10"});
            super.getRepository().push({ id: 7, name: "Tablet", description: "Samsung Galaxy Note N8000 - 3G, Tela 10Pol, Processador Quad Core 1.4Ghz, 16GB, Câmera 5.0MP, Wi-Fi, GPS, Bluetooth", quantity: 7, costPrice: 1530.00, price: 1929.90, category: "Informática/Computadores", date: new Date(1,5,13), ncm: "8471.41.90"});
            
        }


        findByName(name: string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            pageable: domain.util.Pageable) {
                this.$timeout(()=> {
                    var items = this.getRepository().filter(function (element) {
                        return element.name.toLowerCase() == name.toLowerCase();
                    });
                    if (items.length !== 0) successCallback(items, 200, null, null);
                    else errorCallback({ description: "Nome Inexistente"}, 404, null, null);
                }, 100);
        }

        listCategory(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    var categories = [];
                    this.getRepository().forEach((item) => {
                        if (categories.indexOf(item.category) === -1) categories.push(item.category);
                    });
                    if (categories.length > 0) successCallback(categories, 200, null, null);
                    else errorCallback({ description: "Nenhum Grupo Encontrado"}, 404, null, null);
                }, 100);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.service("ProductService", service.mock.ProductServiceMock);
};