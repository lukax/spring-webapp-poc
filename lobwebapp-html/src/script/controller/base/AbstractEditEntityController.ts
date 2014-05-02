///<reference path="../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.base{
	export interface EditEntityViewModel<T extends domain.base.AbstractEntity> extends d.controller.base.ViewModel{
		entity: T;
		isEntityNew: boolean;
		readMode: boolean;
		isPreviousChanges: boolean;
		saveOrUpdateEntity(entity: T): void;
		removeEntity(entity: T): void;
		discardChanges(): void;
	}

	export class AbstractEditEntityController<T extends domain.base.AbstractEntity> implements d.controller.base.Controller{
		private entityName: string = "Item";

		setEntityName(name: string){
			this.entityName = name;
		}

		constructor(public $scope: EditEntityViewModel<T>, 
					public contextUrl: string, 
					public EntityService: d.service.contract.base.EntityService<T>,
					public AlertService: d.service.contract.AlertService){

			this.$scope.saveOrUpdateEntity = (entity) => this.saveOrUpdateEntity(entity);
			this.$scope.removeEntity = (entity) => this.removeEntity(entity);
			this.$scope.discardChanges = () => this.discardChanges();

			this.$scope.$watch("entity.id", () => {
				this.$scope.isEntityNew = this.isEntityNew();
				});
			this.$scope.$on("$destroy", () => {
				this.saveTemporaryChanges();    
				});
		}
		
		saveOrUpdateEntity(entity: T) {
			if (this.$scope.entity.id == 0) this.saveEntity(entity);
			else this.updateEntity(entity);
		}

		saveEntity(entity: T) {
			this.lock();
			this.EntityService.save(entity,
				(successData, successStatus, successHeaders) => {
					this.$scope.navigator.$location.url("/" + this.contextUrl + "/" + successHeaders("Entity-Id"));
				},
				(errorData) => {
					console.log(errorData);
					this.AlertService.addMessageResponse(errorData, this.entityName + " não pôde ser salvo");
					this.unlock();
				});
		}

		updateEntity(entity: T) {
			this.lock();
			this.EntityService.update(entity,
				() => {
					this.unlock();
				},
				(errorData) => {
					console.log(errorData);
					this.AlertService.addMessageResponse(errorData, this.entityName + " não pôde ser atualizado");
					this.unlock();
				});
		}

		removeEntity(entity: T) {
			this.lock();
			this.EntityService.remove(entity,
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
					if(!this.restoreTemporaryChanges(successData))
						this.$scope.entity = successData;
					
					if(done) done();
					this.unlock();
				},
				(errorData) => {
					console.log(errorData);
					this.AlertService.addMessageResponse(errorData, this.entityName + " não pôde ser encontrado");
					this.newEntity();
				});
		}

		discardChanges(){
			this.saveTemporaryChanges(true);
			this.findEntity(""+this.$scope.entity.id);
		}

		newEntity() {
			this.$scope.navigator.$location.url("/"+this.contextUrl+"/new");
		}

		lock(){
			this.$scope.readMode = true;
			this.$scope.navigator.Progress.start();
		}

		unlock(){
			this.$scope.readMode = false;
			this.$scope.navigator.Progress.done();
		}

		isEntityNew() {
			return (this.$scope.entity && this.$scope.entity.id == 0);
		}
		
		private tmpObjKey = "TMP_" + this.contextUrl.toUpperCase();
		private saveTemporaryChanges(removeChanges?: boolean){
			if(removeChanges)
				delete localStorage[this.tmpObjKey];
			else{
				localStorage[this.tmpObjKey] = angular.toJson(this.$scope.entity);
			}
		}
		private restoreTemporaryChanges(fetchedEntity: T){
			var previousEntity = null;
			try{ previousEntity = angular.fromJson(localStorage[this.tmpObjKey]); }
			catch(e){}
			if(previousEntity != null && previousEntity.id == fetchedEntity.id && !_.isEqual(previousEntity, fetchedEntity)){
				this.$scope.entity = previousEntity;
				this.AlertService.add({ content: "Últimas mudanças foram carregadas", type: enums.AlertType.INFO });
				this.$scope.isPreviousChanges = true;
				return true;
			}
			this.$scope.isPreviousChanges = false;
			return false;
		}
	}
}