package com.espindola.lobwebapp.exception.notFound;

import com.espindola.lobwebapp.l10n.MessageKey;

public class CustomerNotFoundException extends NotFoundException {

	private static final long serialVersionUID = 1L;

	public CustomerNotFoundException(Long id){
		super(MessageKey.CUSTOMERNOTFOUND_EXCEPTION, new String[] { id.toString() });
	}
}
