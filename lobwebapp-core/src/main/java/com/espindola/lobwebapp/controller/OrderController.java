package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.controller.base.AbstractEntityController;
import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.service.contract.OrderService;

@Controller
@RequestMapping(value="/order")
public class OrderController extends AbstractEntityController<Order> {

	@Autowired
	public OrderController(OrderService service) {
		super(service);

	}

}
