package com.espindola.lobwebapp.validation.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.domain.OrderItem;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.ErrorCode;
import com.espindola.lobwebapp.validation.validator.base.AbstractEntityValidator;

@Component
public class OrderValidator extends AbstractEntityValidator<Order> {

	private PaymentValidator paymentValidator;
	private Order order;

	@Autowired
	public OrderValidator(PaymentValidator paymentValidator) {
		this.paymentValidator = paymentValidator;
	}

	@Override
	protected void validateEntity(Order t, Errors e) {
		this.order = t;
		
		validateProperty("date", e);
		validateProperty("payment", e);

		if (t.getItems() != null) {
			if (t.getItems().isEmpty())
				addError("items", ErrorCode.REQUIRED,
						MessageKey.VALIDATION_REQUIRED);
			else
				for (OrderItem item : t.getItems()) {
					if (item.getQuantity() == null || item.getQuantity() < 0)
						addError("items", ErrorCode.REQUIRED,
								MessageKey.VALIDATION_MIN, "0");
				}
		}
	}

	@Override
	protected void validateProperty(String property, Errors e) {
		switch (property) {
		case "date":
			required(property);
			break;
		case "payment":
			validateSub(paymentValidator, "payment", (order != null ? order.getPayment() : target), e);
			break;
		}

	}
}