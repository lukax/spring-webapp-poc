package com.espindola.lobwebapp.facade.base;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.service.contract.base.EntityService;

public abstract class AbstractEntityFacade<T extends AbstractEntity> {

	private EntityService<T> entityService;

	public AbstractEntityFacade(EntityService<T> entityService){
		this.entityService = entityService;
	}
	
	public T find(Long id) throws NotFoundException {
		return entityService.find(id);
	}

	public T save(T entity) throws AlreadyExistsException, InvalidArgumentException {
		checkIfValid(entity);
		return entityService.save(entity);
	}

	public T update(T entity) throws NotFoundException, InvalidArgumentException {
		checkIfValid(entity);
		return entityService.update(entity);
	}

	public T remove(Long id) throws NotFoundException {
		return entityService.remove(id);
	}
	
	public List<T> findAll() {
		return entityService.findAll();
	}
	
	public Page<T> findAll(Pageable p) {
		return entityService.findAll(p);
	}
	
	protected abstract void checkIfValid(T entity) throws InvalidArgumentException;
	
}