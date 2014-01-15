package com.espindola.lobwebapp.controller.util;

import java.util.Locale;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.hibernate.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.exception.LobWebAppException;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.exception.util.ErrorResponse;

@ControllerAdvice //Allows the exception handling to operate on all controllers
public class GlobalExceptionHandler {
	
	private Logger logger;
	
	@Autowired
	private MessageSource messageSource;

	public GlobalExceptionHandler(){
		logger = Logger.getLogger(GlobalExceptionHandler.class);
	}
	
	@ExceptionHandler({AlreadyExistsException.class, IllegalArgumentException.class, TypeMismatchException.class})
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorResponse handleBadRequest(Exception ex, Locale locale) {
		logger.log(Level.DEBUG, ex.getMessage());
		return this.buildResponse(ex, locale);
	}
	
	@ExceptionHandler({NotFoundException.class, HttpRequestMethodNotSupportedException.class})
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorResponse handleNotFound(Exception ex, Locale locale) {
		logger.log(Level.DEBUG, ex.getMessage());
		return this.buildResponse(ex, locale);
	}

	@ExceptionHandler({InvalidArgumentException.class, HttpMessageConversionException.class})
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	@ResponseBody
	public ErrorResponse handleEntityInvalid(Exception ex, Locale locale){
		logger.log(Level.DEBUG, ex.getMessage());
		return this.buildResponse(ex, locale);
	}
	
	@ExceptionHandler(AuthenticationCredentialsNotFoundException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ResponseBody
	public ErrorResponse handleAuthentication(Exception ex, Locale locale){
		logger.log(Level.DEBUG, ex.getMessage());
		return this.buildResponse(ex, locale);
	}
	
	@ExceptionHandler
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public ErrorResponse handleOther(Exception ex, Locale locale){
		logger.log(Level.ERROR, ex.getMessage());
		return this.buildResponse(ex, locale);
	}
	
	private ErrorResponse buildResponse(Exception ex, Locale locale){
		if(ex instanceof LobWebAppException){
			LobWebAppException exx = (LobWebAppException)ex;
			return exx.getErrorResponse(this.messageSource, locale);
		}
		return new ErrorResponse(ex.getMessage());
	}
	
}