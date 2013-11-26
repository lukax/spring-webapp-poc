package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.controller.base.PersonController;
import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.service.contract.UserService;

@Controller
@RequestMapping(value="/user")
public class UserController extends PersonController<User> {

	private UserService service;

	@Autowired
	public UserController(UserService service) {
		super(service);
		this.service = service;

	}

	@RequestMapping(method = RequestMethod.GET, value = "/{username}",  headers = {"findByUsername"})
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public User findByUsername(@PathVariable("username") String username){
		return this.service.findByUsername(username);
	}
}
