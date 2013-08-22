package com.espindola.lobwebapp.exception.base;

public class PersistenceException extends LobWebAppException {

	private static final long serialVersionUID = -9101631242645746010L;

	public PersistenceException() {
	}

	public PersistenceException(String message) {
		super(message);
	}

	public PersistenceException(String message, Throwable cause) {
		super(message, cause);
	}
}
