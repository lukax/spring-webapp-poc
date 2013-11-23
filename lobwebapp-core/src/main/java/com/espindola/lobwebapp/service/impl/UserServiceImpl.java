package com.espindola.lobwebapp.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.repository.contract.UserRepository;
import com.espindola.lobwebapp.service.contract.UserService;
import com.espindola.lobwebapp.service.impl.base.AbstractPersonServiceImpl;

@Service
public class UserServiceImpl extends AbstractPersonServiceImpl<User> implements UserService {

	private UserRepository repository;

	@Autowired
	public UserServiceImpl(UserRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public User findByUsername(String username) {
		return this.repository.findByUsername(username);
	}
	
	@Override
	public Boolean authenticate(User user){
		User x = this.repository.findByUsername(user.getUsername());
		if(x != null && x.getPassword().equals(user.getPassword())) {
			return true;
		}
		else { 
			return false;
		}
	}
}
