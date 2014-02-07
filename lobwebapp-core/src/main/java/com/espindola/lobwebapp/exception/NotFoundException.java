package com.espindola.lobwebapp.exception;

import com.espindola.lobwebapp.l10n.MessageKey;

public class NotFoundException extends LobWebAppException {

	private static final long serialVersionUID = 1L;

	public NotFoundException(MessageKey propertyMessageKey, Long id) {
		super(MessageKey.NOTFOUND_EXCEPTION, new Object[] {
				propertyMessageKey.asMessageSourceResolvable(), id });
	}

}