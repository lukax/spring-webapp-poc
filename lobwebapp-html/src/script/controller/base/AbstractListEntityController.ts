///<reference path="../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");
import URI = require("urijs");

export module controller.base {
    export interface ListEntityViewModel<T extends domain.base.AbstractEntity> extends d.controller.base.ViewModel {
        entities: T[];
        editEntity(id: number): void;
        listEntity(page: number): void;
        searchText: string;
        page: domain.util.Page;
    }

    export class AbstractListEntityController<T extends domain.base.AbstractEntity> implements d.controller.base.Controller{
        redirectUrl: string;
        defaultPageSize: number = 50;

        constructor(public $scope: ListEntityViewModel<T>,
                    public EntityService: d.service.contract.base.EntityService<T>,
                    public AlertService: d.service.contract.AlertService,
                    public contextUrl: string,
                    public redirectParam: string) {
            this.redirectUrl = decodeURIComponent($scope.navigator.$stateParams.redirect);
            
            this.$scope.searchText = (this.$scope.navigator.$stateParams.search || "");
            this.$scope.editEntity = (id: number) => this.editEntity(id);
            this.$scope.listEntity = (page) => this.listEntity(page);
        }

        listEntity(pageIndex: number) {
            this.$scope.navigator.Progress.start();
                this.EntityService.list(
                    (successData, successStatus, headers) => {
                        this.$scope.page = { index: pageIndex, size: Number(headers(enums.Headers.PAGE_TOTAL)) };
                        this.$scope.entities = successData;
                        this.$scope.navigator.Progress.done();
                        if (this.redirectUrl) this.AlertService.add({ title: "Busca Rápida", content: "Clique em um item da lista para voltar para a página anterior", type: enums.AlertType.INFO });
                    },
                    (errorData) => {
                        console.log(errorData);
                        this.AlertService.addMessageResponse(errorData, "Não foi possível listar");
                        this.$scope.navigator.Progress.done();
                    }, { index: pageIndex, size: this.defaultPageSize });
        }

        editEntity(id: number) {
            if (this.redirectUrl) {
                this.redirectUrl = new URI(this.redirectUrl).addSearch(this.redirectParam, String(id)).toString();
                this.$scope.navigator.$location.url(this.redirectUrl);
            }
            else 
                this.$scope.navigator.$location.url(new URI(this.contextUrl).segment(String(id)).toString());

        }

    }
}