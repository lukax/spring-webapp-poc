package com.espindola.lobwebapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.exception.EntityExistsException;
import com.espindola.lobwebapp.exception.EntityInvalidException;
import com.espindola.lobwebapp.exception.EntityNotFoundException;
import com.espindola.lobwebapp.exception.base.PersistenceException;

@ControllerAdvice //Allows the exception handling to operate on all controllers
public class HandlerController {

	@ExceptionHandler({EntityNotFoundException.class, EntityExistsException.class, EntityInvalidException.class})
	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorMessage handlePersistenceException(PersistenceException ex) {
		return new ErrorMessage(ClassUtils.getShortName(ex.getClass()), ex.getMessage());
	}

}

class ErrorMessage{
	public ErrorMessage(String error, String message) {
		this.error = error;
		this.message = message;
	}
	public String error;
	public String message;
}
