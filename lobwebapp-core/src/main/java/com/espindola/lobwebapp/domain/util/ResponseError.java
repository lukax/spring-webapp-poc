package com.espindola.lobwebapp.domain.util;

public class ResponseError{
	private String message;
	private String description;
	private ResponseLevel level;
	
	public ResponseError(String error, String message, ResponseLevel level) {
		this.setLevel(level);
		this.setError(error);
		this.setMessage(message);
	}
	public String getError() {
		return description;
	}
	public void setError(String error) {
		this.description = error;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public ResponseLevel getLevel() {
		return level;
	}
	public void setLevel(ResponseLevel degree) {
		this.level = degree;
	}

}