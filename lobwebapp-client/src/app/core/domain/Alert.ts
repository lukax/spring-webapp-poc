module core {
  export interface Alert {
    content: string;
    type?: string;
    title?: string;
    date?: Date;
  }

  export class AlertType {
    public static WARNING = "warning";
    public static DANGER = "danger";
    public static OK = "success";
    public static INFO = "info";
  }
}
