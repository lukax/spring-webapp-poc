package com.espindola.lobwebapp.exception;

import com.espindola.lobwebapp.exception.base.PersistenceException;

public class EntityNotFoundException extends PersistenceException {

	private static final long serialVersionUID = 3580991406329497426L;

	public EntityNotFoundException() {
	}

	public EntityNotFoundException(String message) {
		super(message);
	}

	public EntityNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

}
