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
		throwIfPaymentQtLessIsThanTotalPrice(entity);
		throwIfPaymentQtExceedsMuchFromTotalPrice(entity);
	}

	private void throwIfInvalidPayment(Order entity) {
		if (entity.getPayment().getId() != 0)
			throw new InvalidArgumentException(entityMessageKey,
					new CustomObjectError(ErrorCode.REQUIRED,
							MessageKey.VALIDATION_REQUIRED, "payment"));
	}

	private void throwIfPaymentQtExceedsMuchFromTotalPrice(Order entity) {
		Double exchange = entity.getPayment().getQuantity()
				- entity.computeTotalPrice();
		Double maxExchange = 50D;
		if (exchange > maxExchange)
			throw new InvalidArgumentException(entityMessageKey,
					new CustomObjectError(ErrorCode.INVALID,
							MessageKey.VALIDATION_SIZE, "payment",
							exchange.toString()));
	}

	private void throwIfPaymentQtLessIsThanTotalPrice(Order entity) {
		Double paymentQt = entity.getPayment().getQuantity();
		if (entity.computeTotalPrice() >= paymentQt)
			throw new InvalidArgumentException(entityMessageKey,
					new CustomObjectError(ErrorCode.INVALID,
							MessageKey.VALIDATION_SIZE, "payment.quantity",
							paymentQt.toString()));
	}
}
