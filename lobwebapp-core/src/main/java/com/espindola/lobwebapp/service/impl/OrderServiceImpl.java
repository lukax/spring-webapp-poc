package com.espindola.lobwebapp.service.impl;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.domain.PaymentStatus;
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
		throwIfInvalidPaymentQuantity(entity);
	}

	private void throwIfInvalidPaymentQuantity(Order entity) {
		BigDecimal payment = entity.getPayment().getQuantity();
		BigDecimal minPayment = entity.computeTotalPrice();
		BigDecimal exchange = payment.subtract(minPayment);
		BigDecimal maxExchange = new BigDecimal(50);
		BigDecimal maxPayment = minPayment.add(maxExchange);

		if (entity.getPayment().getStatus() == PaymentStatus.PENDING
				&& entity.getPayment().getQuantity()
						.compareTo(new BigDecimal(0)) == 0) {
			// If status is pending and quantity is 0, let it pass...
		} else if (payment.compareTo(minPayment) == -1
				|| exchange.compareTo(maxExchange) == 1)
			throw new InvalidArgumentException(MessageKey.PAYMENT,
					new CustomObjectError(ErrorCode.INVALID,
							MessageKey.VALIDATION_SIZE, "quantity", minPayment,
							maxPayment));
	}

}
