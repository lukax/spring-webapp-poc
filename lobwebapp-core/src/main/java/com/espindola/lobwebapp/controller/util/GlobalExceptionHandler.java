package com.espindola.lobwebapp.controller.util;

import java.util.Locale;

import org.hibernate.TypeMismatchException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.espindola.lobwebapp.exception.AlreadyExistsException;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.exception.LobWebAppException;
import com.espindola.lobwebapp.exception.NotFoundException;

@ControllerAdvice
// Allows the exception handling to operate on all controllers
public class GlobalExceptionHandler {

	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@Autowired
	private MessageSource messageSource;

	@ExceptionHandler({ AlreadyExistsException.class,
			IllegalArgumentException.class, TypeMismatchException.class })
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public MessageResponse handleBadRequest(Exception ex, Locale locale) {
		logger.debug(ex.getMessage());
		return this.buildResponse(ex, locale);
	}

	@ExceptionHandler({ NotFoundException.class,
			HttpRequestMethodNotSupportedException.class })
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public MessageResponse handleNotFound(Exception ex, Locale locale) {
		logger.debug(ex.getMessage());
		return this.buildResponse(ex, locale);
	}

	@ExceptionHandler({ InvalidArgumentException.class,
			HttpMessageConversionException.class })
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	@ResponseBody
	public MessageResponse handleEntityInvalid(Exception ex, Locale locale) {
		logger.debug(ex.getMessage());
		return this.buildResponse(ex, locale);
	}

	@ExceptionHandler(AuthenticationCredentialsNotFoundException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ResponseBody
	public MessageResponse handleAuthentication(Exception ex, Locale locale) {
		logger.debug(ex.getMessage());
		return this.buildResponse(ex, locale);
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public MessageResponse handleOther(Exception ex, Locale locale) {
		logger.error(ex.getMessage());
		return this.buildResponse(ex, locale);
	}

	private MessageResponse buildResponse(Exception ex, Locale locale) {
		if (ex instanceof LobWebAppException) {
			LobWebAppException exx = (LobWebAppException) ex;
			return exx.getErrorResponse(this.messageSource, locale);
		}
		return new MessageResponse(ex.getMessage());
	}

}