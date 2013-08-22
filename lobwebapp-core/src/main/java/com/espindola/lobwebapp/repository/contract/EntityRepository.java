package com.espindola.lobwebapp.repository.contract;

import org.springframework.data.jpa.repository.JpaRepository;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

public interface EntityRepository<TEntity extends AbstractEntity>
		extends JpaRepository<TEntity, Long> {
}
