package com.espindola.lobwebapp.controller.util;

import org.hibernate.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.exception.AlreadyExistsException;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.exception.NotFoundException;

@ControllerAdvice //Allows the exception handling to operate on all controllers
public class ExceptionHandlerControllerAdvice {

	@ExceptionHandler({AlreadyExistsException.class, IllegalArgumentException.class, TypeMismatchException.class})
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ResponseError handleBadRequest(Exception ex) {
		return this.buildResponse(ex);
	}
	
	@ExceptionHandler({NotFoundException.class, HttpRequestMethodNotSupportedException.class})
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ResponseError handleNotFound(Exception ex) {
		return this.buildResponse(ex);
	}

	@ExceptionHandler({InvalidArgumentException.class, HttpMessageConversionException.class})
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	@ResponseBody
	public ResponseError handleEntityInvalid(Exception ex){
		return this.buildResponse(ex);
	}
	
	@ExceptionHandler(AuthenticationCredentialsNotFoundException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ResponseBody
	public ResponseError handleAuthentication(Exception ex){
		return this.buildResponse(ex);
	}
	
	@ExceptionHandler
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public ResponseError handleOther(Exception ex){
		return this.buildResponse(ex);
	}
	
	private ResponseError buildResponse(Exception ex){
		return new ResponseError(ex.getMessage());
	}
	
}