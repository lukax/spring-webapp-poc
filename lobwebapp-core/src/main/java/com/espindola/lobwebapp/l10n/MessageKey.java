package com.espindola.lobwebapp.l10n;

public enum MessageKey {
	LOBWEBAPP_EXCEPTION("com.espindola.lobwebapp.exception.lobwebappexception"), 
	ALREADYEXISTS_EXCEPTION("com.espindola.lobwebapp.exception.alreadyexistsexception"), 
	NOTFOUND_EXCEPTION("com.espindola.lobwebapp.exception.notfoundexception"), 
	INVALIDARGUMENT_EXCEPTION("com.espindola.lobwebapp.exception.invalidargumentexception"),

	//ENTITIES
	ENTITY("com.espindola.lobwebapp.entity"),  
	ENTITY_PRODUCT("com.espindola.lobwebapp.entity.product"), 
	ENTITY_CUSTOMER("com.espindola.lobwebapp.entity.customer"), 
	ENTITY_ORDER("com.espindola.lobwebapp.entity.order"), 
	ENTITY_STOCK("com.espindola.lobwebapp.entity.stock"), 
	ENTITY_USER("com.espindola.lobwebapp.entity.user"), 
	ENTITY_PAYMENT("com.espindola.lobwebapp.entity.payment"),
	
	//PROPERTIES
	PROPERTY_IMAGE("com.espindola.lobwebapp.property.image"), 

	// VALIDATION
	VALIDATION_INVALID("com.espindola.lobwebapp.validation.entityinvalid"),
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

}