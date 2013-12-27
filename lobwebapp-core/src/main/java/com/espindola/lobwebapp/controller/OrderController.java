package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.controller.base.AbstractEntityController;
import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.invalidArgument.OrderInvalidException;
import com.espindola.lobwebapp.service.contract.OrderService;
import com.espindola.lobwebapp.validation.OrderValidator;

@Controller
@RequestMapping(value="/order")
public class OrderController extends AbstractEntityController<Order> {

	@Autowired
	public OrderController(OrderService service, OrderValidator validator) {
		super(service, validator);
	}

	@Override
	protected void validationResult(BindingResult bindingResult) throws InvalidArgumentException {
		if(bindingResult.hasErrors())
			throw new OrderInvalidException(bindingResult.getAllErrors());
	}
	
}
