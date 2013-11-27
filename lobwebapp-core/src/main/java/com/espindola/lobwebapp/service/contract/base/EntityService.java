package com.espindola.lobwebapp.service.contract.base;

import java.util.List;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.EntityExistsException;
import com.espindola.lobwebapp.exception.EntityInvalidException;
import com.espindola.lobwebapp.exception.EntityNotFoundException;

public interface EntityService<T extends AbstractEntity> {
	
	T save(T entity) throws EntityExistsException, EntityInvalidException;
	T update(T entity) throws EntityNotFoundException, EntityInvalidException;
	T remove(Long id) throws EntityNotFoundException;
	T find(Long id) throws EntityNotFoundException;
	Boolean contains(T entity) throws EntityInvalidException;
	
	//@PreAuthorize("hasRole('ROLE_USER')")
	List<T> list();
}
