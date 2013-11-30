package com.espindola.lobwebapp.exception;


public class AlreadyExistsException extends LobWebAppException {

	private static final long serialVersionUID = 1L;

	public AlreadyExistsException(String message) {
		super(message);
	}
}
