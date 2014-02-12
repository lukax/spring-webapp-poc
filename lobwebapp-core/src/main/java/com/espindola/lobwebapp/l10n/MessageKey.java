package com.espindola.lobwebapp.l10n;

import org.springframework.context.MessageSourceResolvable;
import org.springframework.context.support.DefaultMessageSourceResolvable;

public enum MessageKey {
	LOBWEBAPP_EXCEPTION("com.espindola.lobwebapp.exception.lobwebappexception"), 
	ALREADYEXISTS_EXCEPTION("com.espindola.lobwebapp.exception.alreadyexistsexception"), 
	NOTFOUND_EXCEPTION("com.espindola.lobwebapp.exception.notfoundexception"), 
	INVALIDARGUMENT_EXCEPTION("com.espindola.lobwebapp.exception.invalidargumentexception"),
	NOTAUTHENTICATED_EXCEPTION("com.espindola.lobwebapp.exception.notauthenticated"),
	INVALIDJSON_EXCEPTION("com.espindola.lobwebapp.exception.invalidjson"),
	INVALIDREQUEST_EXCEPTION("com.espindola.lobwebapp.exception.invalidrequest"),
	METHODNOTSUPPORTED_EXCEPTION("com.espindola.lobwebapp.exception.methodnotsupported"),

	ENTITY("com.espindola.lobwebapp.entity"), 
	PROPERTY("com.espindola.lobwebapp.property"), 
	PRODUCT("com.espindola.lobwebapp.product"), 
	CUSTOMER("com.espindola.lobwebapp.customer"), 
	ORDER("com.espindola.lobwebapp.order"), 
	ORDERITEM("com.espindola.lobwebapp.orderitem"), 
	STOCK("com.espindola.lobwebapp.stock"), 
	USER("com.espindola.lobwebapp.user"), 
	PAYMENT("com.espindola.lobwebapp.payment"),
	NAME("com.espindola.lobwebapp.name"),
	IMAGE("com.espindola.lobwebapp.image"),
	DESCRIPTION("com.espindola.lobwebapp.description"),
	COSTPRICE("com.espindola.lobwebapp.costprice"),
	PRICE("com.espindola.lobwebapp.price"),
	CATEGORY("com.espindola.lobwebapp.category"),
	NCM("com.espindola.lobwebapp.ncm"),
	USERNAME("com.espindola.lobwebapp.username"),
	PASSWORD("com.espindola.lobwebapp.password"),
	QUANTITY("com.espindola.lobwebapp.quantity"),
	MINQUANTITY("com.espindola.lobwebapp.minquantity"),
	MAXQUANTITY("com.espindola.lobwebapp.maxquantity"),
	UNIT("com.espindola.lobwebapp.unit"),
	STATUS("com.espindola.lobwebapp.status"),
	MODE("com.espindola.lobwebapp.mode"),
	ITEMS("com.espindola.lobwebapp.items"),
	DATE("com.espindola.lobwebapp.date"),
	REGISTERDATE("com.espindola.lobwebapp.registerdate"),
	
	// VALIDATION
	VALIDATION_INVALID("com.espindola.lobwebapp.validation.invalid"), 
	VALIDATION_REQUIRED("com.espindola.lobwebapp.validation.required"), 
	VALIDATION_INVALIDFORMAT("com.espindola.lobwebapp.validation.format"), 
	VALIDATION_STRINGLENGTH("com.espindola.lobwebapp.validation.stringlength"), 
	VALIDATION_SIZE("com.espindola.lobwebapp.validation.size"), 
	VALIDATION_MIN("com.espindola.lobwebapp.validation.min"), 
	VALIDATION_MAX("com.espindola.lobwebapp.validation.max"), 
	VALIDATION_PATTERN("com.espindola.lobwebapp.validation.pattern"),

	;

	private String key;

	MessageKey(String key) {
		this.key = key;
	}

	public String getKey() {
		return key;
	}
	
	public MessageSourceResolvable asMessageSourceResolvable(){
		return new DefaultMessageSourceResolvable(getKey());
	}

}