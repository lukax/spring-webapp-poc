package com.espindola.lobwebapp.service.contract.base;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.EntityExistsException;
import com.espindola.lobwebapp.exception.EntityInvalidException;
import com.espindola.lobwebapp.exception.EntityNotFoundException;

//@PreAuthorize("hasRole('ROLE_USER')")
public interface EntityService<T extends AbstractEntity> {
	
	T save(T entity) throws EntityExistsException, EntityInvalidException;
	T update(T entity) throws EntityNotFoundException, EntityInvalidException;
	T remove(Long id) throws EntityNotFoundException;
	T find(Long id) throws EntityNotFoundException;
	Boolean exists(T entity) throws EntityInvalidException;
	List<T> findAll();
	Page<T> findAll(Pageable p);
}
