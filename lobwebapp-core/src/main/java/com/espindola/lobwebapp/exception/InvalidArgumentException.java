package com.espindola.lobwebapp.exception;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

public class InvalidArgumentException extends Exception {

	private static final long serialVersionUID = 1L;

	public InvalidArgumentException(String message) {
		super(message);
	}
	
	public InvalidArgumentException(String message, AbstractEntity entity) {
		super(message);
	}
	
}
