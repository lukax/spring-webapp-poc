package com.espindola.lobwebapp.service.contract;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.service.contract.base.EntityService;

public interface StockService extends EntityService<Stock> {
	Stock findByProductId(Long productId);
}
