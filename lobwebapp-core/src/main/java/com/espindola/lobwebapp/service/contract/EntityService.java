package com.espindola.lobwebapp.service.contract;

import java.util.List;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

public interface EntityService<TEntity extends AbstractEntity> {
	
	void save(TEntity entity);
	void update(TEntity entity);
	void delete(Long id);
	TEntity find(Long id);
	TEntity get(TEntity entity);
	List<TEntity> list();
}
