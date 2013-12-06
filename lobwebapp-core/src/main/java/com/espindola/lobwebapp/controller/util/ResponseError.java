package com.espindola.lobwebapp.controller.util;


public class ResponseError{
	private String message;
	
	public ResponseError(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}

}