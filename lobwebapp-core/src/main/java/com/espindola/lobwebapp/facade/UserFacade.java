package com.espindola.lobwebapp.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.facade.base.AbstractEntityFacade;
import com.espindola.lobwebapp.service.contract.UserService;

@Transactional
@Component
public class UserFacade extends AbstractEntityFacade<User> {

	private UserService userService;

	public UserFacade() {
		super(null);
	}

	@Autowired
	public UserFacade(UserService userService) {
		super(userService);
		this.userService = userService;
	}

	public User findByUsername(String username) {
		return userService.findByUsername(username);
	}

}