package com.espindola.lobwebapp.exception;

public class EntityExistsException extends AlreadyExistsException {

	private static final long serialVersionUID = 1L;

	public EntityExistsException(String message) {
		super(message);
	}
}
