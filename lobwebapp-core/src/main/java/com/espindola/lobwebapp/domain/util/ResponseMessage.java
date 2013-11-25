package com.espindola.lobwebapp.domain.util;

public class ResponseMessage{
	private String message;
	private String error;
	private ResponseLevel level;
	public ResponseMessage(String error, String message, ResponseLevel level) {
		this.setLevel(level);
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