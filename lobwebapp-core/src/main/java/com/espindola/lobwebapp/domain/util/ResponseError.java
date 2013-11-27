package com.espindola.lobwebapp.domain.util;

public class ResponseError{
	private String error;
	private String description;
	private ResponseLevel level;
	
	public ResponseError(String error, String description, ResponseLevel level) {
		this.setLevel(level);
		this.setError(error);
		this.setDescription(description);
	}

	public ResponseLevel getLevel() {
		return level;
	}
	public void setLevel(ResponseLevel degree) {
		this.level = degree;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}