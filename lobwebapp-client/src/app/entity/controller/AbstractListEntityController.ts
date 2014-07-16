///<reference path="../../reference.ts"/>

module entity {
  export interface IListEntityController<T extends entity.AbstractEntity> extends IController {
    entities: T[];
    searchText: string;
    page: entity.Page;
    editEntity(id:number): void;
    listEntity(page:number): void;
  }

  export class AbstractListEntityController<T extends entity.AbstractEntity> implements IListEntityController<T> {
    private _redirectUrl:string;
    _defaultPageSize:number = 50;
    entities:T[];
    searchText:string;
    page:entity.Page;

    constructor(public $scope:entity.IAppScope,
                public EntityService:entity.EntityService<T>,
                public AlertService:entity.AlertService,
                public NavigatorService:entity.NavigatorService,
                public contextUrl:string, public redirectParam:string) {
      this.$scope.vm = this;

      this._redirectUrl = NavigatorService.params().redirect != null ? decodeURIComponent(NavigatorService.params().redirect) : null;
      this.searchText = (this.NavigatorService.params().search || "");
    }

    listEntity(pageIndex:number) {
      this.NavigatorService.Progress.start();
      this.EntityService.list(
        (successData, successStatus, headers) => {
          this.page = { index: pageIndex, size: Number(headers(Headers.PAGE_TOTAL)) };
          this.entities = successData;
          this.NavigatorService.Progress.done();
          if (this._redirectUrl) this.AlertService.add({ title: "Busca Rápida", content: "Clique em um item da lista para voltar para a página anterior", type: entity.AlertType.INFO });
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
