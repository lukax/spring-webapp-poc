package com.espindola.lobwebapp.domain.base;

public class ResponseMessage{
	private String message;
	private String description;
	private ResponseDegree degree;
	public ResponseMessage(String error, String message, ResponseDegree degree) {
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
	public ResponseDegree getDegree() {
		return degree;
	}
	public void setDegree(ResponseDegree degree) {
		this.degree = degree;
	}

}