package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.controller.base.AbstractEntityController;
import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.invalidArgument.StockInvalidException;
import com.espindola.lobwebapp.service.contract.StockService;
import com.espindola.lobwebapp.validation.StockValidator;

@Controller
@RequestMapping(value="/stock")
public class StockController extends AbstractEntityController<Stock> {

	@Autowired
	public StockController(StockService service, StockValidator validator) {
		super(service, validator);
	}

	@Override
	protected void validationResult(BindingResult bindingResult) throws InvalidArgumentException {
		if(bindingResult.hasErrors())
			throw new StockInvalidException(bindingResult.getAllErrors());
	}

}