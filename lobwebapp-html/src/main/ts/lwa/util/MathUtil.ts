///<reference path='../../DefinitelyTyped/angularjs/angular.d.ts'/>

module lwa.util{
	export class MathUtil{

		public static round(num: number, decimals?: number){
			if(decimals == null) decimals = 2;
			return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
		}

	}
}