package com.espindola.lobwebapp.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.exception.AlreadyExistsException;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.exception.NotFoundException;
import com.espindola.lobwebapp.facade.base.AbstractEntityFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.service.contract.ProductService;
import com.espindola.lobwebapp.service.contract.StockService;
import com.espindola.lobwebapp.validation.util.CustomObjectError;
import com.espindola.lobwebapp.validation.util.ErrorCode;

@Transactional
@Component
public class StockFacade extends AbstractEntityFacade<Stock> {

	private ProductService productService;

	public StockFacade() {
		super(null);
	}

	@Autowired
	public StockFacade(StockService stockService, ProductService productService) {
		super(stockService);
		this.productService = productService;
	}

	@Override
	public Stock save(Stock entity) throws AlreadyExistsException,
			InvalidArgumentException {
		throwIfProductNotExists(entity);
		return super.save(entity);
	}

	@Override
	public Stock update(Stock entity) throws NotFoundException,
			InvalidArgumentException {
		throwIfProductNotExists(entity);
		return super.update(entity);
	}

	private void throwIfProductNotExists(Stock entity)
			throws InvalidArgumentException {
		if (!productService.exists(entity.getProduct().getId()))
			throw new InvalidArgumentException(MessageKey.STOCK,
					new CustomObjectError(ErrorCode.REQUIRED,
							MessageKey.NOTFOUND_EXCEPTION, "product"));
	}
}
