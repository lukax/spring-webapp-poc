package com.espindola.lobwebapp.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Payment;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Component
public class PaymentValidator extends AbstractEntityValidator<Payment> {

	@Override
	protected void validateEntity(Payment t, Errors e) {
		
		validateQuantity(t, e);
		
		validateMode(t, e);
		
		validateStatus(t, e);
		
	}

	private void validateStatus(Payment t, Errors e) {
		if(t.getStatus() == null)
			e.rejectValue("status", MessageKey.PAYMENTSTATUSINVALID_VALIDATION.getMessageKey(), defaultMessage);
	}

	private void validateMode(Payment t, Errors e) {
		if(t.getMode() == null)
			e.rejectValue("mode", MessageKey.PAYMENTMODEINVALID_VALIDATION.getMessageKey(), defaultMessage);
	}

	private void validateQuantity(Payment t, Errors e) {
		if(t.getQuantity() == null || t.getQuantity() < 0)
			e.rejectValue("quantity", MessageKey.PAYMENTQUANTITYINVALID_VALIDATION.getMessageKey(), defaultMessage);
	}
}