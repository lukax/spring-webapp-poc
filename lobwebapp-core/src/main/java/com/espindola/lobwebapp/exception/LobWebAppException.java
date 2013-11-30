package com.espindola.lobwebapp.exception;

public class LobWebAppException extends RuntimeException {

	private static final long serialVersionUID = -8906012587863340255L;
	
	public LobWebAppException() {
	}
	
	public LobWebAppException(String message){
		super(message);
	}

}
