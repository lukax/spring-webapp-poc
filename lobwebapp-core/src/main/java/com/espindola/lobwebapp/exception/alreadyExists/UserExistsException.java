package com.espindola.lobwebapp.exception.alreadyExists;

import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.l10n.MessageKey;

public class UserExistsException extends AlreadyExistsException {

	private static final long serialVersionUID = 1L;

	public UserExistsException(User entity) {
		super(MessageKey.USERALREADYEXITS_EXCEPTION, new String[] { entity
				.toString() });
	}
}
