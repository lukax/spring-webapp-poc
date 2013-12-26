package com.espindola.lobwebapp.exception.notFound;

import com.espindola.lobwebapp.exception.LobWebAppException;
import com.espindola.lobwebapp.l10n.MessageKey;

public class NotFoundException extends LobWebAppException {

	private static final long serialVersionUID = 1L;

	public NotFoundException() {
		super(MessageKey.NOTFOUND_EXCEPTION, new Object[] {});
	}
}