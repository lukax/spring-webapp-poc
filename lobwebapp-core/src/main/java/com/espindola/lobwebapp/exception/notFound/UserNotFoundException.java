package com.espindola.lobwebapp.exception.notFound;

import com.espindola.lobwebapp.l10n.MessageKey;

public class UserNotFoundException extends NotFoundException {

	private static final long serialVersionUID = 1L;

	public UserNotFoundException(Long id) {
		super(MessageKey.USERNOTFOUND_EXCEPTION, new String[] { id.toString() });
	}
}
