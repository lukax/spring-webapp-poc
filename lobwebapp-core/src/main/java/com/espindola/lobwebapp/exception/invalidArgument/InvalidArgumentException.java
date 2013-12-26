package com.espindola.lobwebapp.exception.invalidArgument;

import com.espindola.lobwebapp.exception.LobWebAppException;
import com.espindola.lobwebapp.l10n.MessageKey;

public class InvalidArgumentException extends LobWebAppException {

	private static final long serialVersionUID = 1L;

	public InvalidArgumentException(){
		super(MessageKey.INVALIDARGUMENT_EXCEPTION, new String[] {} );
	}
	
	protected InvalidArgumentException(MessageKey messageKey, String[] messageArgs){
		super(messageKey, messageArgs);
	}
}