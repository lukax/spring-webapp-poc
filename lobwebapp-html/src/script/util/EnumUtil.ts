///<reference path="./../reference.d.ts"/>

export class OrderStatus {
    public static DELIVERY_OK = 0;
    public static PAYMENT_OK = 0;
}

export class AlertType {
    public static WARNING = "warning";
    public static DANGER = "danger";
    public static OK = "success";
    public static INFO = "info";
}

export class PaymentMode {
    public static MONEY = 0;
    public static CREDIT_CARD = 1;
    public static CHECK = 2;
}