package com.espindola.lobwebapp.domain.util;

public class ResponseMessage{
	private String message;
	private String description;
	private ResponseLevel degree;
	public ResponseMessage(String error, String message, ResponseLevel degree) {
		this.setDegree(degree);
		this.setError(error);
		this.setMessage(message);
	}
	public String getError() {
		return message;
	}
	public void setError(String error) {
		this.message = error;
	}
	public String getMessage() {
		return description;
	}
	public void setMessage(String message) {
		this.description = message;
	}
	public ResponseLevel getDegree() {
		return degree;
	}
	public void setDegree(ResponseLevel degree) {
		this.degree = degree;
	}

}