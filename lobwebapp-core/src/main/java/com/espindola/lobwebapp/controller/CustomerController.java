package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.controller.base.AbstractEntityController;
import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.facade.CustomerFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.CustomerValidator;

@Controller
@RequestMapping(value = "/customer")
public class CustomerController extends AbstractEntityController<Customer> {

	@Autowired
	public CustomerController(CustomerFacade facade, CustomerValidator validator) {
		super(facade, validator, MessageKey.CUSTOMER);
	}

}