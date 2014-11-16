///<reference path="../../reference.d.ts"/>
import EntityServiceMock = require("./base/EntityServiceMock");

class ProductServiceMock extends EntityServiceMock<domain.Product> implements service.contract.ProductService {

    static $inject = ["$timeout"];
    constructor(public $timeout: ng.ITimeoutService) {
        super($timeout);

        this.addToRepository({ id: 0, name: "", description: "", quantity: 0, costPrice: 0, price: 0, category: "", ncm: "" });
        this.addToRepository({ id: 1, name: "Notebook", description: "Dell Inspiron 15R Special Edition Intel Core i5-3230M 2.6 GHz 6144 MB 750 GB", quantity: 9, costPrice: 2102.30, price: 2699.00, category: "Informática/Computadores", ncm: "8471.30.19" });
        this.addToRepository({ id: 2, name: "Notebook", description: "Acer Aspire E1-471-6413 Intel Core i3-2328M 2.2 GHz 6144 MB 500 GB", quantity: 13, costPrice: 976.00, price: 1407.12, category: "Informática/Computadores", ncm: "8471.30.19" });
        this.addToRepository({ id: 3, name: "Memória", description: "Kingston KVR1333D3N9 8192 MB PC DDR3 1333 MHz", quantity: 34, costPrice: 76.34, price: 143.75, category: "Informática/Componentes", ncm: "8473.30.42" });
        this.addToRepository({ id: 4, name: "Memória", description: "Markvision KMM2GBD3-1333 2048 MB PC DDR3 1333 MHz", quantity: 27, costPrice: 27.32, price: 25.10, category: "Informática/Componentes", ncm: "8473.30.42" });
        this.addToRepository({ id: 5, name: "SSD", description: "Kingston SSDNow E100 SE100S37 100 GB Interno", quantity: 6, costPrice: 1035.00, price: 1388.82, category: "Informática/Armazenamento", ncm: "8473.30.99" });
        this.addToRepository({ id: 6, name: "Desktop", description: "Dell Vostro Slim 260 com Intel Core i3, Memoria 8GB, HD 500GB, Gravador DVD, Leitor de Cartões e Windows 7 Pro 64 e Antivirus", quantity: 3, costPrice: 1380.00, price: 1599.99, category: "Informática/Computadores", ncm: "8471.50.10" });
        this.addToRepository({ id: 7, name: "Tablet", description: "Samsung Galaxy Note N8000 - 3G, Tela 10Pol, Processador Quad Core 1.4Ghz, 16GB, Câmera 5.0MP, Wi-Fi, GPS, Bluetooth", quantity: 7, costPrice: 1530.00, price: 1929.90, category: "Informática/Computadores", ncm: "8471.41.90" });
    }


    findByName(name: string,
        successCallback: (data: domain.Product[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        pageable: domain.util.Page) {
        this.$timeout(() => {
            var items = this.getRepository().filter(function (element) {
                return element.name.toLowerCase() == name.toLowerCase();
            });
            if (items.length !== 0) successCallback(items, 200, () => "", null);
            else errorCallback({ message: "Nome Inexistente" }, 404, () => "", null);
        }, 100);
    }

    listCategory(
        successCallback: (data: string[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any,
        errorCallback: (data: domain.util.MessageResponse, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) => any) {
        this.$timeout(() => {
            var categories = [];
            this.getRepository().forEach((item) => {
                if (categories.indexOf(item.category) === -1) categories.push(item.category);
            });
            if (categories.length > 0) successCallback(categories, 200, () => "", null);
            else errorCallback({ message: "Nenhum Grupo Encontrado" }, 404, () => "", null);
        }, 100);
    }

    getImageUrl(productId: number) {
        return "/api/product/" + productId + "/image";
    }

    getMarkUp(product: domain.Product) {
        if (product.costPrice == 0) return null;
        return (product.price - product.costPrice) / product.costPrice;
    }
}
export = ProductServiceMock;