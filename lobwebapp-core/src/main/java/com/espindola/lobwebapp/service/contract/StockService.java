package com.espindola.lobwebapp.service.contract;

import java.util.List;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.service.contract.base.EntityService;

public interface StockService extends EntityService<Stock> {
	List<Stock> findByProductId(Long productId);
}
