package com.espindola.lobwebapp.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.invalidArgument.StockInvalidException;
import com.espindola.lobwebapp.exception.util.EntityError;
import com.espindola.lobwebapp.facade.base.AbstractEntityFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.service.contract.ProductService;
import com.espindola.lobwebapp.service.contract.StockService;

@Transactional
@Component
public class StockFacade extends AbstractEntityFacade<Stock> {

	private ProductService productService;

	public StockFacade(){ super(null); }
	
	@Autowired
	public StockFacade(StockService stockService, ProductService productService) {
		super(stockService);
		this.productService = productService;
	}

	protected void checkIfValid(Stock entity) throws InvalidArgumentException {
		if(!productService.exists(entity.getProduct().getId()))
			throw new StockInvalidException(new EntityError(MessageKey.STOCKPRODUCTINVALID_VALIDATION));
	}
}
