///<reference path="../../reference.ts"/>

module entity{
	export interface IEditEntityController<T extends entity.AbstractEntity> extends IController {
		entity: T;
    isEntityNew: boolean;
    isPreviousChanges: boolean;
    isReadMode: boolean;
		saveOrUpdateEntity(): void;
		removeEntity(): void;
		discardChanges(): void;
	}

	export class AbstractEditEntityController<T extends entity.AbstractEntity> implements IEditEntityController<T> {
    private _tempObjKey: string;
    private _entity: T;
    entity: T;
    isEntityNew: boolean;
    isPreviousChanges: boolean;
    isReadMode: boolean;

    constructor(public $scope: entity.IAppScope,
                public EntityService: entity.EntityService<T>,
                public AlertService: entity.AlertService,
                public NavigatorService: entity.NavigatorService,
                public contextUrl: string,
                public entityName: string) {
      this.$scope.vm = this;
      this._tempObjKey = "TMP_" + this.contextUrl.toUpperCase();

      this.$scope.$watch("vm.entity", (newValue: T) => {
      	this.onEntityChanged(newValue);
        }, true);
			this.$scope.$on("$destroy", () => {
				this.saveTemporaryChanges();
				});
    }

		saveOrUpdateEntity() {
			if (this.isEntityNew) this.saveEntity();
			else this.updateEntity();
		}

		saveEntity() {
			this.lock();
			this.EntityService.save(this.entity,
				(successData, successStatus, successHeaders) => {
					this.NavigatorService.url(new URI(this.contextUrl).segment(successHeaders("Entity-Id")).toString());
				},
				(errorData) => {
					console.log(errorData);
					this.AlertService.addMessageResponse(errorData, this.entityName + " não pôde ser salvo");
					this.unlock();
				});
		}

		updateEntity() {
			this.lock();
			this.EntityService.update(this.entity,
				() => {
					this.unlock();
				},
				(errorData) => {
					console.log(errorData);
					this.AlertService.addMessageResponse(errorData, this.entityName + " não pôde ser atualizado");
					this.unlock();
				});
		}

		removeEntity() {
			this.lock();
			this.EntityService.remove(this.entity,
				() => {
					this.newEntity();
				},
				(errorData) => {
					console.log(errorData);
					this.AlertService.addMessageResponse(errorData, this.entityName + " não pôde ser removido");
					this.unlock();
				});
		}

		findEntity(prettyId: string, done?: ()=> void) {
			var actualId;
			if(prettyId == "new") actualId = 0;
			else actualId = Number(prettyId);

			this.lock();
			this.EntityService.find(actualId,
				(successData) => {
					if(!this.restoreTemporaryChanges(successData)){
						this.entity = successData;
          }
					if(done) done();
					this.unlock();
				},
				(errorData) => {
					console.log(errorData);
					this.AlertService.addMessageResponse(errorData, this.entityName + " não pôde ser encontrado");
					this.newEntity();
          this.unlock();
				});
		}

		discardChanges(){
			this.discardTemporaryChanges();
			this.findEntity(String(this.entity.id));
		}

		newEntity() {
			this.NavigatorService.url(new URI(this.contextUrl).segment("new").toString());
		}

		lock(){
			this.isReadMode = true;
			this.NavigatorService.Progress.start();
		}

		unlock(){
			this.isReadMode = false;
			this.NavigatorService.Progress.done();
		}

		onEntityChanged(entity: T){
      this.isEntityNew = (entity && entity.id == 0);
		}

		private saveTemporaryChanges(){
		  localStorage[this._tempObjKey] = angular.toJson(this.entity);
    }

    private discardTemporaryChanges(){
			delete localStorage[this._tempObjKey];
    }

		private restoreTemporaryChanges(fetchedEntity: T){
			var previousEntity = null;
			try{ previousEntity = angular.fromJson(localStorage[this._tempObjKey]); }
			catch(e){ console.log("[INFO]: could not restore previous changes")}
			if(previousEntity != null && previousEntity.id == fetchedEntity.id && !angular.equals(previousEntity, fetchedEntity)){
				this.entity = previousEntity;
				console.log("[INFO]: previous changes restored");
				this.isPreviousChanges = true;
				return true;
			}
			this.isPreviousChanges = false;
			return false;
		}
	}
}
