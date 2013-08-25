package com.espindola.lobwebapp.domain.base;

public class ErrorMessage{
	private String error;
	private String description;
	public ErrorMessage(String error, String message) {
		this.setError(error);
		this.setMessage(message);
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public String getMessage() {
		return description;
	}
	public void setMessage(String message) {
		this.description = message;
	}

}