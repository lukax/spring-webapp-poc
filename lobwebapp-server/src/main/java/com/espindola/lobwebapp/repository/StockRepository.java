package com.espindola.lobwebapp.repository;

import org.springframework.stereotype.Repository;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.repository.base.EntityRepository;

@Repository
public interface StockRepository extends EntityRepository<Stock> {
	Stock findByProductId(Long productId);
}
