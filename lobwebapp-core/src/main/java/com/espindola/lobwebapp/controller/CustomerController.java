package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.controller.base.PersonController;
import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.exception.invalidArgument.CustomerInvalidException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.facade.CustomerFacade;
import com.espindola.lobwebapp.validation.CustomerValidator;

@Controller
@RequestMapping(value = "/customer")
public class CustomerController extends PersonController<Customer> {

	@Autowired
	public CustomerController(CustomerFacade facade, CustomerValidator validator) {
		super(facade, validator);
	}

	@Override
	protected void validationResult(BindingResult bindingResult)
			throws InvalidArgumentException {
		if (bindingResult.hasErrors())
			throw new CustomerInvalidException(bindingResult.getAllErrors());
	}

}