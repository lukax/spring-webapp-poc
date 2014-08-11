///<reference path="../reference.ts"/>

module order {
  export interface Payment extends core.AbstractEntity {
    quantity: number;
    status: string;
    mode: string;
  }

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

}
