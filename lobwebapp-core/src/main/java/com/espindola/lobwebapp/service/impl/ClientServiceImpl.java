package com.espindola.lobwebapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Client;
import com.espindola.lobwebapp.repository.contract.ClientRepository;
import com.espindola.lobwebapp.service.contract.ClientService;
import com.espindola.lobwebapp.service.impl.base.PersonServiceImpl;

@Service
public class ClientServiceImpl extends PersonServiceImpl<Client> implements
		ClientService {

	@Autowired
	public ClientServiceImpl(ClientRepository repository) {
		super(repository);
	}

}
