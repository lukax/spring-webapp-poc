package com.espindola.lobwebapp.exception;

import com.espindola.lobwebapp.l10n.MessageKey;

public class NotFoundException extends LobWebAppException {

	private static final long serialVersionUID = 1L;

	public NotFoundException() {
		super(MessageKey.NOTFOUND_EXCEPTION, new String[] { MessageKey.ENTITY.getKey() });
	}
	
	public NotFoundException(MessageKey propertyMessageKey, Long id){
		super(MessageKey.NOTFOUND_EXCEPTION, new String[] { propertyMessageKey.getKey() });
	}

	protected NotFoundException(MessageKey messageKey, String[] messageArgs) {
		super(messageKey, messageArgs);
	}

}