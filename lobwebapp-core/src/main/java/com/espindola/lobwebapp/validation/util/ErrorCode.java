package com.espindola.lobwebapp.validation.util;

public enum ErrorCode {
	REQUIRED(0), 
	SIZE(1)
	;
	
	private int code;
	
	ErrorCode(int code){
		this.code = code;
	}

	public int getCode() {
		return code;
	}

}