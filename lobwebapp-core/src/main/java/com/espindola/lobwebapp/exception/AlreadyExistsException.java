package com.espindola.lobwebapp.exception;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.l10n.MessageKey;

public class AlreadyExistsException extends LobWebAppException {

	private static final long serialVersionUID = 1L;

	public AlreadyExistsException(MessageKey propertyMessageKey,
			AbstractEntity entity) {
		super(MessageKey.ALREADYEXISTS_EXCEPTION, new Object[] {
				propertyMessageKey.getMessageSourceResolvable(),
				entity.toString() });
	}

}