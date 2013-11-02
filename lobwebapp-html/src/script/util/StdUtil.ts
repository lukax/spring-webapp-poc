///<reference path="./../reference.d.ts"/>

export module util {
    export class Std {

        public static round(num: number, decimals?: number) {
            if (decimals == null) decimals = 2;
            return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        }

        public static contains(array: any[], item: any) {
            var i = array.length;
            while (i--) {
                if (array[i] === item) {
                    return true;
                }
            }
            return false;
        }
    }
}