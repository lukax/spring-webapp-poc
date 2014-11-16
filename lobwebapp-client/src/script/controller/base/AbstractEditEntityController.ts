///<reference path="../../reference.d.ts"/>
import _ = require("underscore");
import URI = require("urijs");
import enumUtil = require("./../../util/EnumUtil");

export interface IEditEntityController<T extends domain.base.AbstractEntity> extends controller.base.IController {
    entity: T;
    isEntityNew: boolean;
    isPreviousChanges: boolean;
    isReadMode: boolean;
    saveOrUpdateEntity(): void;
    removeEntity(): void;
    discardChanges(): void;
}

export class AbstractEditEntityController<T extends domain.base.AbstractEntity> implements IEditEntityController<T> {
    private _tempObjKey: string;
    entity: T;
    isEntityNew: boolean;
    isPreviousChanges: boolean;
    isReadMode: boolean;

    constructor(public $scope: controller.base.IAppScope,
        public EntityService: service.contract.base.EntityService<T>,
        public AlertService: service.contract.AlertService,
        public contextUrl: string,
        public entityName: string) {
        this.$scope.vm = this;
        this._tempObjKey = "TMP_" + this.contextUrl.toUpperCase();
        this.isEntityNew = true;

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
                this.$scope.navigator.url(new URI(this.contextUrl).segment(successHeaders("Entity-Id")).toString());
            },
            (errorData) => {
                console.log(errorData);
                this.discardTemporaryChanges();
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
                this.discardTemporaryChanges();
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
                this.discardTemporaryChanges();
                this.AlertService.addMessageResponse(errorData, this.entityName + " não pôde ser removido");
                this.unlock();
            });
    }

    findEntity(prettyId: string, done?: () => void) {
        var actualId;
        if (prettyId == "new") actualId = 0;
        else actualId = Number(prettyId);

        this.lock();
        this.EntityService.find(actualId,
            (successData) => {
                if (!this.restoreTemporaryChanges(successData))
                    this.entity = successData;

                if (done) done();
                this.unlock();
            },
            (errorData) => {
                console.log(errorData);
                this.discardTemporaryChanges();
                this.AlertService.addMessageResponse(errorData, this.entityName + " não pôde ser encontrado");
                this.newEntity();
            });
    }

    discardChanges() {
        this.discardTemporaryChanges();
        this.findEntity(String(this.entity.id));
    }

    newEntity() {
        this.$scope.navigator.url(new URI(this.contextUrl).segment("new").toString());
    }

    lock() {
        this.isReadMode = true;
        this.$scope.navigator.Progress.start();
    }

    unlock() {
        this.isReadMode = false;
        this.$scope.navigator.Progress.done();
    }

    onEntityChanged(entity: T) {
        this.isEntityNew = (entity && entity.id == 0);
    }

    private saveTemporaryChanges() {
        localStorage[this._tempObjKey] = angular.toJson(this.entity);
    }

    private discardTemporaryChanges() {
        delete localStorage[this._tempObjKey];
    }

    private restoreTemporaryChanges(fetchedEntity: T) {
        var previousEntity = null;
        try {
            previousEntity = angular.fromJson(localStorage[this._tempObjKey]);
        }
        catch (e) {
            console.log("[INFO]: could not restore previous changes")
      }
        if (previousEntity != null && previousEntity.id == fetchedEntity.id && !angular.equals(previousEntity, fetchedEntity)) {
            this.entity = previousEntity;
            console.log("[INFO]: previous changes restored");
            this.isPreviousChanges = true;
            return true;
        }
        this.isPreviousChanges = false;
        return false;
    }
}
