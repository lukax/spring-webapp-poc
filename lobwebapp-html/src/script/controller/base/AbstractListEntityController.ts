///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.base {
    export interface ListEntityViewModel<T extends domain.base.AbstractEntity> extends d.controller.base.ViewModel {
        entities: T[];
        editEntity(id: number): void;
        listEntity(page: number): void;
        searchText: string;
        page: domain.util.Page;
    }

    export class AbstractListEntityController<T extends domain.base.AbstractEntity> implements d.controller.base.Controller{
        redirectString: string;
        defaultPageSize: number = 50;

        constructor(public $scope: ListEntityViewModel<T>,
                    public EntityService: d.service.contract.base.EntityService<T>,
                    public AlertService: d.service.contract.AlertService,
                    public contextUrl: string,
                    public redirectParam: string) {

            this.$scope.searchText = (this.$scope.navigator.params().search || "");
            this.$scope.editEntity = (id: number) => this.editEntity(id);
            this.$scope.listEntity = (page) => this.listEntity(page);
        }

        listEntity(pageIndex: number) {
            this.$scope.page = { index: pageIndex, size: 1 };
            this.$scope.navigator.progress.start();
                this.EntityService.list(
                    (successData, successStatus, headers) => {
                        this.$scope.page.size = Number(headers(enums.Headers.PAGE_TOTAL));
                        this.$scope.entities = successData;
                        this.$scope.navigator.progress.done();
                        if (this.redirectString) this.AlertService.add({ title: "Busca Rápida", content: "Clique em um item da lista para voltar para a página anterior", type: enums.AlertType.INFO });
                    },
                    (errorData, errorStatus) => {
                        this.AlertService.add({ title: "Erro ao listar", content: errorData.message, type: enums.AlertType.DANGER });
                        console.log(errorData);
                        this.$scope.navigator.progress.done();
                    }, { index: pageIndex, size: this.defaultPageSize });
        }

        editEntity(id: number) {
            this.redirectString = this.$scope.navigator.params().redirect;
            if (this.redirectString) this.$scope.navigator.navigateTo(this.redirectString + "?" + this.redirectParam + "=" + id);
            else this.$scope.navigator.navigateTo(this.contextUrl + id);
        }

    }
}