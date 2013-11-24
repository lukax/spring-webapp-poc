package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.controller.base.PersonController;
import com.espindola.lobwebapp.domain.Client;
import com.espindola.lobwebapp.service.contract.ClientService;

@Controller
@RequestMapping(value="/client")
public class ClientController extends PersonController<Client> {

	@Autowired
	public ClientController(ClientService service) {
		super(service);

	}

}
