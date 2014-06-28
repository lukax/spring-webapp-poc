package com.espindola.lobwebapp.validation.validator;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindException;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.domain.OrderItem;
import com.espindola.lobwebapp.domain.Payment;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.ErrorCode;
import com.espindola.lobwebapp.validation.validator.base.AbstractEntityValidator;

@Component
public class OrderValidator extends AbstractEntityValidator<Order> {

	private PaymentValidator paymentValidator;
	
	@Autowired
	public OrderValidator(PaymentValidator paymentValidator) {
		this.paymentValidator = paymentValidator;
	}

	@Override
	protected void validateEntity(Order t, Errors e) {
		validateOrderItems(t.getItems(), e);
		validateDate("date");
		validatePayment("payment", t.getPayment(), e);
	}

	private void validateDate(String propertyName) {
		required(propertyName);
	}

	private void validatePayment(String propertyName, Payment t, Errors e) {
		BindException paymentErrors = new BindException(t, propertyName);
		this.paymentValidator.validate(t, paymentErrors);
		for (ObjectError objErr : paymentErrors.getAllErrors()) {
			e.rejectValue(propertyName + "." + objErr.getObjectName(),
					objErr.getCode(), objErr.getArguments(), defaultMessage);
		}
	}

	private void validateOrderItems(Set<OrderItem> items, Errors errors) {
		if (items == null || items.isEmpty())
			addError("items", ErrorCode.REQUIRED,
					MessageKey.VALIDATION_REQUIRED);
		else
			for (OrderItem item : items) {
				if (item.getQuantity() == null || item.getQuantity() < 0)
					addError("items", ErrorCode.REQUIRED,
							MessageKey.VALIDATION_MIN, "0");
			}
	}
}