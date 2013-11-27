package com.espindola.lobwebapp.controller.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.util.ClassUtils;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.domain.util.ResponseLevel;
import com.espindola.lobwebapp.domain.util.ResponseError;
import com.espindola.lobwebapp.exception.EntityExistsException;
import com.espindola.lobwebapp.exception.EntityInvalidException;
import com.espindola.lobwebapp.exception.EntityNotFoundException;

@ControllerAdvice //Allows the exception handling to operate on all controllers
public class ExceptionHandlerControllerAdvice {

	@ExceptionHandler(EntityExistsException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ResponseError handleEntityExistsEx(EntityExistsException ex) {
		return new ResponseError(ClassUtils.getShortName(ex.getClass()), ex.getMessage(), ResponseLevel.ALERT);
	}
	
	@ExceptionHandler({EntityNotFoundException.class, HttpRequestMethodNotSupportedException.class})
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ResponseError handleNotFoundEx(Exception ex) {
		return new ResponseError(ClassUtils.getShortName(ex.getClass()), ex.getMessage(), ResponseLevel.ALERT);
	}

	@ExceptionHandler({ EntityInvalidException.class, HttpMessageConversionException.class})
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	@ResponseBody
	public ResponseError handleEntityInvalidEx(Exception ex){
		return new ResponseError(ClassUtils.getShortName(ex.getClass()), ex.getMessage(), ResponseLevel.WARNING);
	}
	
	@ExceptionHandler
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public ResponseError handleOtherEx(Exception ex){
		return new ResponseError(ClassUtils.getShortName(ex.getClass()), ex.getMessage(), ResponseLevel.WARNING);
	}
}