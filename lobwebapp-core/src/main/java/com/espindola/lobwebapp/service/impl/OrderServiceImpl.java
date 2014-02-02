package com.espindola.lobwebapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.repository.OrderRepository;
import com.espindola.lobwebapp.service.contract.OrderService;
import com.espindola.lobwebapp.service.impl.base.AbstractEntityServiceImpl;
import com.espindola.lobwebapp.validation.util.CustomObjectError;
import com.espindola.lobwebapp.validation.util.ErrorCode;

@Service
public class OrderServiceImpl extends AbstractEntityServiceImpl<Order>
		implements OrderService {

	@Autowired
	public OrderServiceImpl(OrderRepository repository) {
		super(repository, MessageKey.ORDER);
	}

	@Override
	protected void throwIfInvalid(Order entity) throws InvalidArgumentException {
		// TODO: Business logic
		throwIfInvalidPayment(entity);
		throwIfInvalidPaymentQuantity(entity);
	}

	private void throwIfInvalidPayment(Order entity) {
		if (entity.getPayment().getId() != 0)
			throw new InvalidArgumentException(entityMessageKey,
					new CustomObjectError(ErrorCode.REQUIRED,
							MessageKey.VALIDATION_REQUIRED, "payment"));
	}

	private void throwIfInvalidPaymentQuantity(Order entity) {
		Double payment = entity.getPayment().getQuantity();
		Double minPayment = entity.computeTotalPrice();
		Double exchange = payment - minPayment;
		Double maxExchange = 50D;
		Double maxPayment = minPayment + maxExchange;
		
		if (minPayment >= payment || exchange > maxExchange)
			throw new InvalidArgumentException(entityMessageKey,
					new CustomObjectError(ErrorCode.INVALID,
							MessageKey.VALIDATION_SIZE, "payment.quantity",
							minPayment, maxPayment));
	}

}
