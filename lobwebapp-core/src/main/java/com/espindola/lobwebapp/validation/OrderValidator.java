package com.espindola.lobwebapp.validation;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindException;
import org.springframework.validation.Errors;

import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.domain.OrderItem;
import com.espindola.lobwebapp.domain.Payment;
import com.espindola.lobwebapp.domain.Product;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Component
public class OrderValidator extends AbstractEntityValidator<Order> {
	
	private PaymentValidator paymentValidator;

	@Autowired
	public OrderValidator(PaymentValidator paymentValidator){
		this.paymentValidator = paymentValidator;
	}

	@Override
	protected void validateEntity(Order t, Errors e) {
		
		validateCustomer(t.getCustomer(), e);

		validatePayment(t.getPayment(), e);
		
		validateOrderItems(t.getItems(), e);
		
		validateDate(t, e);
		
	}

	private void validateDate(Order t, Errors errors) {
		if(t.getDate() == null)
			errors.rejectValue("date", MessageKey.ORDERDATEINVALID_VALIDATION.getKey(), defaultMessage);
	}
	
	private void validateCustomer(Customer customer, Errors errors){
		//Check just the customer's ID since it's not cascading stuff
		if(customer == null || customer.getId() == null || customer.getId() <= 0){
			errors.rejectValue("product", MessageKey.ORDERCUSTOMERINVALID_VALIDATION.getKey(), defaultMessage);
		}
	}
	
	private void validateProduct(Product product, Errors errors){
		//Check just the product's ID since it's not cascading stuff
		if(product == null || product.getId() == null || product.getId() <= 0){
			errors.rejectValue("product", MessageKey.ORDERITEMSINVALID_VALIDATION.getKey(), defaultMessage);
		}
	}
	
	private void validatePayment(Payment payment, Errors errors){
		BindException paymentErrors = new BindException(payment, "payment");
		this.paymentValidator.validate(payment, paymentErrors);
		if(paymentErrors.hasErrors()){
			errors.rejectValue("product", MessageKey.ORDERPAYMENTINVALID_VALIDATION.getKey(), defaultMessage);
		}
	}
	
	private void validateOrderItems(Set<OrderItem> items, Errors errors){
		if(items == null || items.isEmpty())
			errors.rejectValue("items", MessageKey.ORDERITEMSINVALID_VALIDATION.getKey(), defaultMessage);
		else
			for(OrderItem item : items){
				validateProduct(item.getProduct(), errors);
				if(item.getQuantity() == null || item.getQuantity() < 0)
					errors.rejectValue("items", MessageKey.ORDERITEMSINVALID_VALIDATION.getKey(), defaultMessage);
			}
	}
}