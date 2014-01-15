package com.espindola.lobwebapp.repository;

import org.springframework.stereotype.Repository;

import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.repository.base.PersonRepository;

@Repository
public interface UserRepository extends PersonRepository<User> {
	User findByUsername(String username);
}
