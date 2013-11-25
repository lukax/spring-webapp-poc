package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.controller.base.PersonController;
import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.service.contract.CustomerService;

@Controller
@RequestMapping(value="/customer")
public class CustomerController extends PersonController<Customer> {

	@Autowired
	public CustomerController(CustomerService service) {
		super(service);

	}

}
