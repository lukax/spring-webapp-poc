///<reference path="./../reference.d.ts"/>

export class PaymentStatus {
    public static PENDING = 0;
    public static CONFIRMED = 1;
    public static CANCELLED = 2;
}

export class DeliveryStatus {
    public static PENDING = 0;
    public static CONFIRMED = 1;
    public static CANCELLED = 2;
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