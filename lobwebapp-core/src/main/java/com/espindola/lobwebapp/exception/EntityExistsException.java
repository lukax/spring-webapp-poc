package com.espindola.lobwebapp.exception;

import com.espindola.lobwebapp.exception.base.PersistenceException;

public class EntityExistsException extends PersistenceException {

	private static final long serialVersionUID = -6335035953219755692L;

	public EntityExistsException() {
	}

	public EntityExistsException(String message) {
		super(message);
	}

	public EntityExistsException(String message, Throwable cause) {
		super(message, cause);
	}
}
