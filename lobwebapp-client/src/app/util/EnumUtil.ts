///<reference path="../reference.ts"/>

module util {
  export class PaymentStatus {
    public static OK = "OK";
    public static PENDING = "PENDING";
    public static CANCELLED = "CANCELLED";
  }

  export class PaymentMode {
    public static MONEY = "MONEY";
    public static CREDIT_CARD = "CREDIT_CARD";
    public static CHECK = "CHECK";
  }

  export class AlertType {
    public static WARNING = "warning";
    public static DANGER = "danger";
    public static OK = "success";
    public static INFO = "info";
  }

  export class Headers {
    public static PAGE_TOTAL = "page_total";
  }
}
