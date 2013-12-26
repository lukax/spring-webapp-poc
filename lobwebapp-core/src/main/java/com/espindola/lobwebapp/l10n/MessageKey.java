package com.espindola.lobwebapp.l10n;

public enum MessageKey {
	LOBWEBAPP_EXCEPTION("com.espindola.lobwebapp.exception.lobwebappexception"),
	ALREADYEXISTS_EXCEPTION("com.espindola.lobwebapp.exception.alreadyexistsexception"),
	NOTFOUND_EXCEPTION("com.espindola.lobwebapp.exception.notfoundexception"),
	INVALIDARGUMENT_EXCEPTION("com.espindola.lobwebapp.exception.invalidargumentexception"),
	
	;
	
	private String messageKey;

	MessageKey(String messageKey){
		this.messageKey = messageKey;
	}

	public String getMessageKey() {
		return messageKey;
	}

}