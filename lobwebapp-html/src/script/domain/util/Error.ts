
module domain.util {
    export interface Error {
        message: string;
        error?: string;
        level?: string;
    }
}