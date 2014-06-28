package com.espindola.lobwebapp.controller.util;

import java.util.Locale;

import org.codehaus.jackson.JsonParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.web.HttpMediaTypeException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.exception.AlreadyExistsException;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.exception.LobWebAppException;
import com.espindola.lobwebapp.exception.NotFoundException;
import com.espindola.lobwebapp.l10n.MessageKey;

@ControllerAdvice
// Allows the exception handling to operate on all controllers
public class GlobalExceptionHandler {

	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@Autowired
	private MessageSource messageSource;
	
	@ExceptionHandler(AlreadyExistsException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	@ResponseBody
	public MessageResponse handleAlreadyExists(AlreadyExistsException ex, Locale locale){
		logger.debug(ex.getMessage());
		return ex.getMessageResponse(messageSource, locale);
	}

	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public MessageResponse handleNotFound(NotFoundException ex, Locale locale) {
		logger.debug(ex.getMessage());
		return ex.getMessageResponse(messageSource, locale);
	}
	
	@ExceptionHandler(InvalidArgumentException.class)
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	@ResponseBody
	public MessageResponse handleInvalidArgument(InvalidArgumentException ex, Locale locale) {
		logger.debug(ex.getMessage());
		return ex.getMessageResponse(messageSource, locale);
	}
	
	@ExceptionHandler(LobWebAppException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public MessageResponse handleInternalError(LobWebAppException ex, Locale locale) {
		logger.debug(ex.getMessage());
		return ex.getMessageResponse(messageSource, locale);
	}
	
	@ExceptionHandler(AuthenticationCredentialsNotFoundException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ResponseBody
	public MessageResponse handleNoCredentials(AuthenticationCredentialsNotFoundException ex, Locale locale) {
		logger.debug(ex.getMessage());
		return new MessageResponse(messageSource.getMessage(MessageKey.NOTAUTHENTICATED_EXCEPTION.getKey(), new Object[] {}, locale));
	}
	
	@ExceptionHandler(HttpMessageNotReadableException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public MessageResponse handleInvalidHttpMessage(HttpMessageNotReadableException ex, Locale locale) {
		logger.debug(ex.getMessage());
		if(ex.getCause() instanceof JsonParseException){
			return new MessageResponse(messageSource.getMessage(MessageKey.INVALIDJSON_EXCEPTION.getKey(), new Object[] {}, locale));		
		}
		return new MessageResponse(messageSource.getMessage(MessageKey.INVALIDREQUEST_EXCEPTION.getKey(), new Object[] {}, locale));
	}
	
	@ExceptionHandler(HttpMediaTypeException.class)
	@ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
	@ResponseBody
	public MessageResponse handleInvalidMediaType(HttpMediaTypeException ex, Locale locale){
		logger.debug(ex.getMessage());
		return new MessageResponse(ex.getMessage());
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	@ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
	@ResponseBody
	public MessageResponse handleMethodNotSupported(HttpRequestMethodNotSupportedException ex, Locale locale){
		logger.debug(ex.getMessage());
		return new MessageResponse(messageSource.getMessage(MessageKey.METHODNOTSUPPORTED_EXCEPTION.getKey(), new Object[] {}, locale));
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public MessageResponse handleOther(Exception ex, Locale locale) {
		logger.error(ex.getMessage());
		return new MessageResponse("Erro interno");
	}

}