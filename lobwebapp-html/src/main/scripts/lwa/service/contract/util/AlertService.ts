///<reference path='./../../../domain/util/Alert.ts'/>

export interface AlertService{
    add: (message: string, title?: string, type?: domain.util.AlertType) => domain.util.AlertBlueprint;
    remove: (alert: domain.util.AlertBlueprint) => void;
    removeAll: () => void;
    list: () => domain.util.AlertBlueprint[];
}