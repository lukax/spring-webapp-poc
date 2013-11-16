package com.espindola.lobwebapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.repository.contract.UserRepository;
import com.espindola.lobwebapp.service.contract.base.UserService;
import com.espindola.lobwebapp.service.impl.base.PersonServiceImpl;

@Service
public class UserServiceImpl extends PersonServiceImpl<User> implements UserService {

	@Autowired
	public UserServiceImpl(UserRepository repository) {
		super(repository);
	}

}
