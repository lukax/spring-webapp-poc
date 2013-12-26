package com.espindola.lobwebapp.service.impl.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.repository.contract.base.EntityRepository;
import com.espindola.lobwebapp.service.contract.base.EntityService;

public abstract class AbstractEntityServiceImpl<T extends AbstractEntity> implements EntityService<T> {

	private EntityRepository<T> repository;

	@Autowired
	public AbstractEntityServiceImpl(EntityRepository<T> repository) {
		this.repository = repository;

	}

	@Override
	public T find(Long id) throws NotFoundException {
		throwIfNotFound(id);
		return repository.findOne(id);
	}

	@Override
	public T save(T entity) throws AlreadyExistsException, InvalidArgumentException {
		throwIfInvalid(entity);
		throwIfAlreadyExists(entity);
		return repository.save(entity);
	}

	@Override
	public T update(T entity) throws NotFoundException, InvalidArgumentException {
		throwIfInvalid(entity);
		throwIfNotFound(entity.getId());
		return repository.save(entity);
	}

	@Override
	public T remove(Long id) throws NotFoundException {
		throwIfNotFound(id);
		T entity = repository.findOne(id);
		repository.delete(id);
		return entity;
	}

	@Override
	public List<T> findAll() {
		return repository.findAll();
	}
	
	@Override
	public Page<T> findAll(Pageable p) {
		return repository.findAll(p);
	}
	
	protected abstract void throwIfAlreadyExists(T entity) throws AlreadyExistsException;
	protected abstract void throwIfInvalid(T entity) throws InvalidArgumentException;
	protected abstract void throwIfNotFound(Long id) throws NotFoundException;
	
}
