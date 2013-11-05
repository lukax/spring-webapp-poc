///<reference path="./../../reference.d.ts"/>
///<amd-dependency path="angular"/>
import a = require("./base/EntityServiceMock");

export module service.mock {
    export class ProductServiceMock extends a.service.mock.base.EntityServiceMock<domain.Product> implements d.service.contract.ProductService {

        static $inject = ["$timeout", "_"];
        constructor(public $timeout: ng.ITimeoutService, public _: _<domain.Product>) {
            super($timeout, _);
            super.getRepository().push({ id: 1, name: "Notebook", description: "Dell Inspiron 15R Special Edition Intel Core i5-3230M 2.6 GHz 6144 MB 750 GB", quantity: 9, costPrice: 2102.30, price: 2699.00, group: "Informática/Dispositivos", date: new Date(12,12,12)});
            super.getRepository().push({ id: 2, name: "Notebook", description: "Acer Aspire E1-471-6413 Intel Core i3-2328M 2.2 GHz 6144 MB 500 GB", quantity: 13, costPrice: 976.00, price: 1407.12, group: "Informática/Dispositivos", date: new Date(13,10,09)});
            super.getRepository().push({ id: 3, name: "Memória", description: "Kingston KVR1333D3N9 8192 MB PC DDR3 1333 MHz", quantity: 34, costPrice: 76.34, price: 143.75, group: "Informática/Componentes", date: new Date(13,07,15)});
            super.getRepository().push({ id: 4, name: "Memória", description: "Markvision KMM2GBD3-1333 2048 MB PC DDR3 1333 MHz", quantity: 27, costPrice: 27.32, price: 25.10, group: "Informática/Componentes", date: new Date(11,04,09)});
            super.getRepository().push({ id: 5, name: "SSD", description: "Kingston SSDNow E100 SE100S37 100 GB Interno", quantity: 6, costPrice: 1035.00, price: 1388.82, group: "Informática/Componentes", date: new Date(12,05,10)});
        }


        findByName(name: string,
            successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(()=> {
                    var items = this.getRepository().filter(function (element) {
                        return element.name.toLowerCase() == name.toLowerCase();
                    });
                    if (items.length !== 0) successCallback(items, 200, null, null);
                    else errorCallback({message: "Nome Inexistente"}, 404, null, null);
                }, 100);
        }

        listGroups(
            successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
            errorCallback: (data: domain.util.Error, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
                this.$timeout(() => {
                    var groups = [];
                    this.getRepository().forEach((item) => {
                        if (groups.indexOf(item.group) === -1) groups.push(item.group);
                    });
                    if (groups.length > 0) successCallback(groups, 200, null, null);
                    else errorCallback({message: "Nenhum Grupo Encontrado"}, 404, null, null);
                }, 100);
        }
    }
}

export var register = (moduleName: string) => {
    (<any>angular.module(moduleName)).lazy.service("ProductService", service.mock.ProductServiceMock);
};