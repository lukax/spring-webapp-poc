
module domain.util {
    export interface Alert {
        content: string;
        type?: string;
        title?: string;
        time?: Date;
    }

    export enum AlertType {
        WARNING
    }
}