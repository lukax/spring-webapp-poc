package com.espindola.lobwebapp.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.repository.base.EntityRepository;

@Repository
public interface StockRepository extends EntityRepository<Stock> {
	List<Stock> findByProductId(Long productId);
}
