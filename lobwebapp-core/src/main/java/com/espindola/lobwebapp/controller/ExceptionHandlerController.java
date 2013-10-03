package com.espindola.lobwebapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.domain.base.ResponseDegree;
import com.espindola.lobwebapp.domain.base.ResponseMessage;
import com.espindola.lobwebapp.exception.EntityExistsException;
import com.espindola.lobwebapp.exception.EntityInvalidException;
import com.espindola.lobwebapp.exception.EntityNotFoundException;
import com.espindola.lobwebapp.exception.base.PersistenceException;

@ControllerAdvice //Allows the exception handling to operate on all controllers
public class ExceptionHandlerController {

	@ExceptionHandler({EntityNotFoundException.class, EntityExistsException.class, EntityInvalidException.class})
	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseMessage handlePersistenceException(PersistenceException ex) {
		return new ResponseMessage(ClassUtils.getShortName(ex.getClass()), ex.getMessage(), ResponseDegree.ALERT);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	public ResponseMessage handleMethodArgEx(MethodArgumentNotValidException ex){
		return new ResponseMessage(ClassUtils.getShortName(ex.getClass()), ex.getMessage(), ResponseDegree.ALERT);
	}
	
//	@ExceptionHandler(EntityInvalidException.class)
//	@ResponseBody
//	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
//	public ErrorMessage handleEntityInvalidRequest(EntityInvalidException ex){
//		return new ErrorMessage(ClassUtils.getShortName(ex.getClass()), ex.getMessage());
//	}
	
}