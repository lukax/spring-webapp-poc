///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");

export module controller.base{
	export interface EditEntityViewModel<T extends domain.base.AbstractEntity> extends d.controller.base.ViewModel{
		entity: T;
		isEntityNew: boolean;
		readMode: boolean;
	}

	export class AbstractEditEntityController<T extends domain.base.AbstractEntity> implements d.controller.base.Controller{
		constructor(public $scope: EditEntityViewModel<T>, 
		            public contextUrl: string, 
		            public EntityService: d.service.contract.base.EntityService<T>,
		            public AlertService: d.service.contract.AlertService){
		                
            this.$scope.$watch("entity.id", (newValue: number, oldValue: number) => {
                this.$scope.isEntityNew = this.isEntityNew();
            });
		}
		
		saveChanges(entity: T) {
            if (this.$scope.entity.id == 0) this.saveEntity(entity);
            else this.updateEntity(entity);
        }

        saveEntity(entity: T) {
            this.lock();
            this.EntityService.save(entity,
                (successData, successStatus, successHeaders) => {
                    this.$scope.navigator.navigateTo("/" + this.contextUrl + "/" + successHeaders("Entity-Id"));
                },
                (errorData, errorStatus) => {
                    console.log(errorData);
                    this.AlertService.add({ content: errorData.message, title: "Item não pôde ser salvado", type: enums.AlertType.DANGER });
                    this.unlock();
                });
        }

        updateEntity(entity: T) {
            this.lock();
            this.EntityService.update(entity,
                (successData, successStatus) => {
                    this.unlock();
                },
                (errorData, errorStatus) => {
                    console.log(errorData);
                    this.AlertService.add({ content: errorData.message, title: "Item não pôde ser atualizado", type: enums.AlertType.DANGER });
                    this.unlock();
                });
        }

        removeEntity(entity: T) {
            this.lock();
            this.EntityService.remove(entity,
                (successData, successStatus) => {
                    this.newEntity();
                },
                (errorData, errorStatus) => {
                    console.log(errorData);
                    this.AlertService.add({ content: errorData.message, title: "Item não pôde ser removido", type: enums.AlertType.DANGER });
                    this.unlock();
                });
        }

        findEntity(prettyId: string, done?: ()=> void) {
            var actualId;
            if(prettyId == "new") actualId = 0;
            else actualId = Number(prettyId);
            
            this.lock();
            this.EntityService.find(actualId,
                (successData, successStatus) => {
                    this.$scope.entity = successData;
                    if(done) done();
                    this.unlock();
                },
                (errorData, errorStatus) => {
                    console.log(errorData);
                    this.AlertService.add({ content: errorData.message, title: "Item não pôde ser encontrado", type: enums.AlertType.DANGER });
                    this.newEntity();
                });
        }

        newEntity() {
            this.$scope.navigator.navigateTo("/"+this.contextUrl+"/new");
        }

		lock(){
			this.$scope.readMode = true;
		    this.$scope.navigator.progress.start();
		}

		unlock(){
			this.$scope.readMode = false;
			this.$scope.navigator.progress.done();
		}

		isEntityNew() {
            return (this.$scope.entity && this.$scope.entity.id == 0);
        }
        
	}
}