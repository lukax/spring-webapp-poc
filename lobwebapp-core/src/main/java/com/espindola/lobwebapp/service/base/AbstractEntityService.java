package com.espindola.lobwebapp.service.base;

import java.util.List;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.repository.contract.AbstractEntityRepository;
import com.espindola.lobwebapp.service.contract.EntityService;

public abstract class AbstractEntityService<TEntity extends AbstractEntity>
		implements EntityService<TEntity> {

	private AbstractEntityRepository<TEntity> repository;

	public AbstractEntityService(AbstractEntityRepository<TEntity> repository) {
		this.repository = repository;

	}

	@Override
	public TEntity get(TEntity entity) {
		return repository.findOne(entity.getId());
	}

	@Override
	public TEntity find(Long id) {
		return repository.findOne(id);
	}

	@Override
	public List<TEntity> list() {
		return repository.findAll();
	}

	@Override
	// @Transactional Spring JPA is already annotated with this
	public void save(TEntity entity) {
		repository.save(entity);
	}

	@Override
	public void update(TEntity entity) {
		repository.save(entity);
	}

	@Override
	public void delete(Long id) {
		repository.delete(repository.findOne(id));
	}

}
