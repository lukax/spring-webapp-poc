///<reference path="../../reference.ts"/>

module core {
  export interface NavigatorService {
    Progress: Progress;
    params(): any;
    url(to:string): void;
  }
}
