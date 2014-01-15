package com.espindola.lobwebapp.l10n;

public enum MessageKey {
	LOBWEBAPP_EXCEPTION("com.espindola.lobwebapp.exception.lobwebappexception"), ALREADYEXISTS_EXCEPTION(
			"com.espindola.lobwebapp.exception.alreadyexistsexception"), NOTFOUND_EXCEPTION(
			"com.espindola.lobwebapp.exception.notfoundexception"), INVALIDARGUMENT_EXCEPTION(
			"com.espindola.lobwebapp.exception.invalidargumentexception"),

	PRODUCTALREADYEXITS_EXCEPTION(
			"com.espindola.lobwebapp.exception.productalreadyexistsexception"), PRODUCTINVALID_EXCEPTION(
			"com.espindola.lobwebapp.exception.productinvalidexception"), PRODUCTNOTFOUND_EXCEPTION(
			"com.espindola.lobwebapp.exception.productnotfoundexception"),

	CUSTOMERALREADYEXITS_EXCEPTION(
			"com.espindola.lobwebapp.exception.customeralreadyexistsexception"), CUSTOMERINVALID_EXCEPTION(
			"com.espindola.lobwebapp.exception.customerinvalidexception"), CUSTOMERNOTFOUND_EXCEPTION(
			"com.espindola.lobwebapp.exception.customernotfoundexception"),

	ORDERALREADYEXITS_EXCEPTION(
			"com.espindola.lobwebapp.exception.orderalreadyexistsexception"), ORDERINVALID_EXCEPTION(
			"com.espindola.lobwebapp.exception.orderinvalidexception"), ORDERNOTFOUND_EXCEPTION(
			"com.espindola.lobwebapp.exception.ordernotfoundexception"),

	STOCKALREADYEXITS_EXCEPTION(
			"com.espindola.lobwebapp.exception.stockalreadyexistsexception"), STOCKINVALID_EXCEPTION(
			"com.espindola.lobwebapp.exception.stockinvalidexception"), STOCKNOTFOUND_EXCEPTION(
			"com.espindola.lobwebapp.exception.stocknotfoundexception"),

	USERALREADYEXITS_EXCEPTION(
			"com.espindola.lobwebapp.exception.useralreadyexistsexception"), USERINVALID_EXCEPTION(
			"com.espindola.lobwebapp.exception.userinvalidexception"), USERNOTFOUND_EXCEPTION(
			"com.espindola.lobwebapp.exception.usernotfoundexception"),

	PAYMENTINVALID_EXCEPTION(
			"com.espindola.lobwebapp.exception.paymentinvalidexception"),

	// VALIDATION

	ENTITYINVALID_VALIDATION("com.espindola.lobwebapp.validation.entityinvalid"), ENTITYIDINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.entityidinvalid"), PRODUCTNAMEINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.productnameinvalid"), PRODUCTDESCRIPTIONINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.productdescriptioninvalid"), PRODUCTCOSTPRICEINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.productcostpriceinvalid"), PRODUCTPRICEINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.productpriceinvalid"), PRODUCTCATEGORYINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.productcategoryinvalid"), PRODUCTNCMINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.productncminvalid"), PRODUCTIMAGEINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.productimageinvalid"), PRODUCTIMAGETOOBIG_VALIDATION(
			"com.espindola.lobwebapp.validation.productimagetoobig"), PRODUCTREGISTERDATEINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.productregisterdateinvalid"), PRODUCTPRICETOOBIG_VALIDATION(
			"com.espindola.lobwebapp.validation.productpricetoobig"),

	STOCKPRODUCTINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.stockproductinvalid"), STOCKQUANTITYINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.stockquantityinvalid"), STOCKMAXQUANTITYINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.stockmaxquantityinvalid"), STOCKMINQUANTITYINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.stockminquantityinvalid"), STOCKUNITINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.stockunitinvalid"),

	PERSONNAMEINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.personnameinvalid"),

	USERUSERNAMEINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.userusernameinvalid"), USERPASSWORDINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.userpasswordinvalid"),

	ORDERCUSTOMERINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.ordercustomerinvalid"), ORDERITEMSINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.orderitemsinvalid"), ORDERDATEINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.orderdateinvalid"), ORDERPAYMENTINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.orderpaymentinvalid"), ORDERPAYMENTQUANTITYLESSTHANTOTAL_VALIDATION(
			"com.espindola.lobwebapp.validation.orderpaymentquantitylessthantotal"), ORDERPAYMENTQUANTITYTOOBIG_VALIDATION(
			"com.espindola.lobwebapp.validation.orderpaymentquantitytoobig"),

	PAYMENTQUANTITYINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.paymentquantityinvalid"), PAYMENTMODEINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.paymentmodeinvalid"), PAYMENTSTATUSINVALID_VALIDATION(
			"com.espindola.lobwebapp.validation.paymentstatusinvalid"),

	;

	private String key;

	MessageKey(String key) {
		this.key = key;
	}

	public String getKey() {
		return key;
	}

}