package com.espindola.lobwebapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.repository.contract.OrderRepository;
import com.espindola.lobwebapp.service.contract.OrderService;
import com.espindola.lobwebapp.service.impl.base.AbstractEntityServiceImpl;

@Service
@Transactional
public class OrderServiceImpl extends AbstractEntityServiceImpl<Order> implements OrderService {

	@Autowired
	public OrderServiceImpl(OrderRepository repository) {
		super(repository);
	}

}
