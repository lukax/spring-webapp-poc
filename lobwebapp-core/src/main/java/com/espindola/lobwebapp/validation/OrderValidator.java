package com.espindola.lobwebapp.validation;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindException;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.domain.OrderItem;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Component
public class OrderValidator extends AbstractEntityValidator<Order> {

	private PaymentValidator paymentValidator;
	private Order t;
	private Errors e;

	@Autowired
	public OrderValidator(PaymentValidator paymentValidator) {
		this.paymentValidator = paymentValidator;
	}

	@Override
	protected void validateEntity(Order t, Errors e) {
		this.t = t;
		this.e = e;
		validateOrderItems(t.getItems(), e);
		validateDate("date");
		validatePayment("payment");
	}

	private void validateDate(String fieldName) {
		required(fieldName);
	}

	private void validatePayment(String fieldName) {
		BindException paymentErrors = new BindException(t, fieldName);
		this.paymentValidator.validate(t, paymentErrors);
		for (ObjectError objErr : paymentErrors.getAllErrors()) {
			e.rejectValue(fieldName + "." + objErr.getObjectName(),
					objErr.getCode(), objErr.getArguments(), defaultMessage);
		}
	}

	private void validateOrderItems(Set<OrderItem> items, Errors errors) {
		if (items == null || items.isEmpty())
			addError("items", MessageKey.VALIDATION_REQUIRED);
		else
			for (OrderItem item : items) {;
				if (item.getQuantity() == null || item.getQuantity() < 0)
					addError("items", MessageKey.VALIDATION_MIN, "0");
			}
	}
}