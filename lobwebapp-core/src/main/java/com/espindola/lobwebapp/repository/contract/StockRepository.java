package com.espindola.lobwebapp.repository.contract;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.repository.contract.base.EntityRepository;

@Repository
public interface StockRepository extends EntityRepository<Stock> {
	List<Stock> findByProductId(Long productId);
}
