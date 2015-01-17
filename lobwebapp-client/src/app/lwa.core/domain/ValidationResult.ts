
module domain.util{
	export interface ValidationResult {
		code: number;
		propertyName: string;
		message: string;
	}
}