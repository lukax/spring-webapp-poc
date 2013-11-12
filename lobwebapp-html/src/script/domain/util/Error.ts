
module domain.util {
    export interface Error {
        message: string;
        cause?: string;
        fix?: string;
        date?: Date;
    }
}