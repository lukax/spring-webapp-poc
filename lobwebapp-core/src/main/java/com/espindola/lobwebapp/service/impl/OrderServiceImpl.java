package com.espindola.lobwebapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.alreadyExists.OrderExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.invalidArgument.OrderInvalidException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.exception.notFound.OrderNotFoundException;
import com.espindola.lobwebapp.exception.util.EntityError;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.repository.contract.OrderRepository;
import com.espindola.lobwebapp.service.contract.OrderService;
import com.espindola.lobwebapp.service.impl.base.AbstractEntityServiceImpl;

@Service
public class OrderServiceImpl extends AbstractEntityServiceImpl<Order> implements OrderService {

	private OrderRepository repository;

	@Autowired
	public OrderServiceImpl(OrderRepository repository) {
		super(repository);
		this.repository = repository;
	}
	
	
	@Override
	protected void throwIfInvalid(Order entity) throws InvalidArgumentException {
		//TODO: Business logic
		throwIfInvalidPayment(entity);
	}
	
	@Override
	protected void throwIfAlreadyExists(Order entity) throws AlreadyExistsException {
		if(repository.exists(entity.getId()))
			throw new OrderExistsException(entity);
	}

	@Override
	protected void throwIfNotFound(Long id) throws NotFoundException {
		if(!repository.exists(id))
			throw new OrderNotFoundException(id);
	}

	private void throwIfInvalidPayment(Order entity) {
		if(entity.getPayment().getId() != 0)
			throw new OrderInvalidException(new EntityError(MessageKey.ORDERPAYMENTINVALID_VALIDATION));
		
		if(entity.computeTotalPrice() >= entity.getPayment().getQuantity())
			throw new OrderInvalidException(new EntityError(MessageKey.ORDERPAYMENTQUANTITYLESSTHANTOTAL_VALIDATION));
	}
}
