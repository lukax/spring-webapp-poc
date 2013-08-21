package com.espindola.lobwebapp.repository.contract;

import org.springframework.data.jpa.repository.JpaRepository;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

public interface AbstractEntityRepository<TEntity extends AbstractEntity>
		extends JpaRepository<TEntity, Long> {
}
