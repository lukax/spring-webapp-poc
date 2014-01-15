package com.espindola.lobwebapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.alreadyExists.UserExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.exception.notFound.UserNotFoundException;
import com.espindola.lobwebapp.repository.UserRepository;
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
	
	
	@Override
	protected void throwIfInvalid(User entity) throws InvalidArgumentException {
		//TODO: Business logic
	}
	
	@Override
	protected void throwIfAlreadyExists(User entity) throws AlreadyExistsException {
		if(repository.exists(entity.getId()))
			throw new UserExistsException(entity);
	}

	@Override
	protected void throwIfNotFound(Long id) throws NotFoundException {
		if(!repository.exists(id))
			throw new UserNotFoundException(id);
	}
}
