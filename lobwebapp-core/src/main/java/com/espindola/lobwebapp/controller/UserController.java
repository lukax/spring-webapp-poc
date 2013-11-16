package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.espindola.lobwebapp.controller.base.PersonController;
import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.service.contract.base.UserService;

@Controller
@RequestMapping(value="/user")
public class UserController extends PersonController<User> {

	@Autowired
	public UserController(UserService service) {
		super(service);

	}

}
