///<reference path="../../reference.ts"/>

module controller.base {
  export interface IListEntityController<T extends domain.base.AbstractEntity> extends controller.base.IController {
    entities: T[];
    searchText: string;
    page: domain.util.Page;
    editEntity(id:number): void;
    listEntity(page:number): void;
  }

  export class AbstractListEntityController<T extends domain.base.AbstractEntity> implements IListEntityController<T> {
    private _redirectUrl:string;
    _defaultPageSize:number = 50;
    entities:T[];
    searchText:string;
    page:domain.util.Page;

    constructor(public $scope:controller.base.IAppScope,
                public EntityService:service.contract.base.EntityService<T>,
                public AlertService:service.contract.AlertService,
                public NavigatorService:service.contract.NavigatorService,
                public contextUrl:string,
                public redirectParam:string) {
      this.$scope.vm = this;

      this._redirectUrl = NavigatorService.params().redirect != null ? decodeURIComponent(NavigatorService.params().redirect) : null;
      this.searchText = (this.NavigatorService.params().search || "");
    }

    listEntity(pageIndex:number) {
      this.NavigatorService.Progress.start();
      this.EntityService.list(
        (successData, successStatus, headers) => {
          this.page = { index: pageIndex, size: Number(headers(util.Headers.PAGE_TOTAL)) };
          this.entities = successData;
          this.NavigatorService.Progress.done();
          if (this._redirectUrl) this.AlertService.add({ title: "Busca Rápida", content: "Clique em um item da lista para voltar para a página anterior", type: util.AlertType.INFO });
        },
        (errorData) => {
          console.log(errorData);
          this.AlertService.addMessageResponse(errorData, "Não foi possível listar");
          this.NavigatorService.Progress.done();
        }, { index: pageIndex, size: this._defaultPageSize });
    }

    editEntity(id:number) {
      if (this._redirectUrl) {
        this._redirectUrl = new URI(this._redirectUrl)
          .removeSearch(this.redirectParam)
          .addSearch(this.redirectParam, String(id))
          .toString();
        this.NavigatorService.url(this._redirectUrl);
      }
      else
        this.NavigatorService.url(new URI(this.contextUrl).segment(String(id)).toString());
    }

  }
}
