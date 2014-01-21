package com.espindola.lobwebapp.service.contract.base;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.exception.NotFoundException;

//@PreAuthorize("hasRole('ROLE_USER')")
public interface EntityService<T extends AbstractEntity> {

	T save(T entity) throws NotFoundException, InvalidArgumentException;

	T update(T entity) throws NotFoundException, InvalidArgumentException;

	T remove(Long id) throws NotFoundException;

	T find(Long id) throws NotFoundException;

	List<T> findAll();

	Page<T> findAll(Pageable p);

	boolean exists(Long id);
}
