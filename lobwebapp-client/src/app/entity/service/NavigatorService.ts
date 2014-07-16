///<reference path="../../reference.ts"/>

module entity {
  export interface NavigatorService {
    Progress: Progress;
    params(): any;
    url(to:string): void;
  }
}
