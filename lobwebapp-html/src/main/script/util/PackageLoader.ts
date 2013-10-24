///<reference path="./../reference.d.ts"/>

import a = require('./Progress');

export module util{
    export interface PackageLoaderCfg{
        baseElement: Element;
    }

    export class PackageLoader{
        private static _instance: PackageLoader = null;
        private pkgs: string[] =  [];
        private currPkgNumber: number = 0;
        private onLoaded: Function;

        constructor(){
            if(PackageLoader._instance){
                throw new Error("Error: Instantiation failed: Use getInstance() method instead of new.");
            }
            PackageLoader._instance = this;
        }

        public static getInstance(): PackageLoader{
            if(PackageLoader._instance == null){
                return (PackageLoader._instance = new PackageLoader());
            }
            return PackageLoader._instance;
        }

        public load(packages: string[], onLoaded: Function): void{
            this.pkgs = packages;
            this.onLoaded = onLoaded;
            a.util.Progress.start();
            this.reallyLoad();
        }

        private reallyLoad(): void{
            if (this.currPkgNumber < this.pkgs.length) {
                a.util.Progress.set(this.loadPercent());
                require([this.pkgs[this.currPkgNumber]], () => {
                    this.currPkgNumber++;
                    this.reallyLoad();
                });
            } else {
                a.util.Progress.done(this.onLoaded);
            }
        }

        public currentPackage(): string{
            return this.pkgs[this.currPkgNumber];
        }

        public loadPercent(): number{
            return ((this.currPkgNumber ) / this.pkgs.length);
        }

    }

}