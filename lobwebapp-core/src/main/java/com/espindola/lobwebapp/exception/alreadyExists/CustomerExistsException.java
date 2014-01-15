package com.espindola.lobwebapp.exception.alreadyExists;

import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.l10n.MessageKey;

public class CustomerExistsException extends AlreadyExistsException {

	private static final long serialVersionUID = 1L;

	public CustomerExistsException(Customer entity) {
		super(MessageKey.CUSTOMERALREADYEXITS_EXCEPTION, new String[] { entity
				.toString() });
	}
}
