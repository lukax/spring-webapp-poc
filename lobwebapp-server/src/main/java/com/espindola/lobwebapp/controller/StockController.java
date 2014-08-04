package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.facade.StockFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.validator.StockValidator;

@Controller
@RequestMapping(value = "/stock")
public class StockController extends AbstractEntityController<Stock> {

	@Autowired
	public StockController(StockFacade facade, StockValidator validator) {
		super(facade, validator, MessageKey.STOCK);
	}

}