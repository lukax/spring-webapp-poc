package com.espindola.lobwebapp.validation;

public enum ErrorCode {
	REQUIRED(0), INVALID(1);

	private int code;

	ErrorCode(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

}