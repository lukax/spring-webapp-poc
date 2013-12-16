package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.controller.base.AbstractEntityController;
import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.service.contract.StockService;

@Controller
@RequestMapping(value="/stock")
public class StockController extends AbstractEntityController<Stock> {

	@Autowired
	public StockController(StockService service) {
		super(service);
	}

}
