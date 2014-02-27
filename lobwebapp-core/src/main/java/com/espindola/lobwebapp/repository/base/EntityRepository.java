package com.espindola.lobwebapp.repository.base;

import org.springframework.data.jpa.repository.JpaRepository;

import com.espindola.lobwebapp.domain.base.AbstractEntity;

public interface EntityRepository<T extends AbstractEntity> extends
		JpaRepository<T, Long> {

}
