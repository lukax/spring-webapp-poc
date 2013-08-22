package com.espindola.lobwebapp.exception.base;

public class LobWebAppException extends Exception {

	private static final long serialVersionUID = -8906012587863340255L;
	
	public LobWebAppException() {
	}
	
	public LobWebAppException(String message){
		super(message);
	}
	
	public LobWebAppException(String message, Throwable cause) {
		super(message, cause);
	}

}
