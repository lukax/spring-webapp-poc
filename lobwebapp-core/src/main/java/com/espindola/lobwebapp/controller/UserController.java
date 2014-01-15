package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.controller.base.PersonController;
import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.invalidArgument.UserInvalidException;
import com.espindola.lobwebapp.facade.UserFacade;
import com.espindola.lobwebapp.validation.UserValidator;

@Controller
@RequestMapping(value = "/user")
public class UserController extends PersonController<User> {

	private UserFacade facade;

	@Autowired
	public UserController(UserFacade facade, UserValidator validator) {
		super(facade, validator);
		this.facade = facade;
	}

	@RequestMapping(value = "/{userUsername}", method = RequestMethod.HEAD)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public User findByUsername(@PathVariable("userUsername") String userUsername) {
		return this.facade.findByUsername(userUsername);
	}

	@Override
	protected void validationResult(BindingResult bindingResult)
			throws InvalidArgumentException {
		if (bindingResult.hasErrors())
			throw new UserInvalidException(bindingResult.getAllErrors());
	}
}
