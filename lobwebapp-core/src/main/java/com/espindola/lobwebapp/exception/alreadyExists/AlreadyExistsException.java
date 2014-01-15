package com.espindola.lobwebapp.exception.alreadyExists;

import com.espindola.lobwebapp.exception.LobWebAppException;
import com.espindola.lobwebapp.l10n.MessageKey;

public class AlreadyExistsException extends LobWebAppException {

	private static final long serialVersionUID = 1L;

	public AlreadyExistsException() {
		super(MessageKey.ALREADYEXISTS_EXCEPTION, new String[] {});
	}

	protected AlreadyExistsException(MessageKey messageKey, String[] messageArgs) {
		super(messageKey, messageArgs);
	}
}