package com.espindola.lobwebapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.controller.base.AbstractEntityController;
import com.espindola.lobwebapp.controller.util.RequestKey;
import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.facade.UserFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.UserValidator;

@Controller
@RequestMapping(value = "/user")
public class UserController extends AbstractEntityController<User> {

	private UserFacade facade;

	@Autowired
	public UserController(UserFacade facade, UserValidator validator) {
		super(facade, validator, MessageKey.USER);
		this.facade = facade;
	}

	@RequestMapping(method = RequestMethod.GET, params = { RequestKey.USER_USERNAME })
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public User findByUsername(
			@RequestParam(RequestKey.USER_USERNAME) String userUsername) {
		return this.facade.findByUsername(userUsername);
	}

}
