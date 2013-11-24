package com.espindola.lobwebapp.service.contract;


import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.service.contract.base.EntityService;

public interface UserService extends EntityService<User> {
	User findByUsername(String username);
	Boolean authenticate(User user);
}
