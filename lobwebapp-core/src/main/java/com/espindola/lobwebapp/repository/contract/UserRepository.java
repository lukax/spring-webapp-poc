package com.espindola.lobwebapp.repository.contract;

import org.springframework.stereotype.Repository;
import com.espindola.lobwebapp.domain.User;
import com.espindola.lobwebapp.repository.contract.base.PersonRepository;

@Repository
public interface UserRepository extends PersonRepository<User> {
}
