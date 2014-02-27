package com.espindola.lobwebapp.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.domain.OrderItem;
import com.espindola.lobwebapp.domain.Stock;
import com.espindola.lobwebapp.exception.AlreadyExistsException;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.exception.NotFoundException;
import com.espindola.lobwebapp.facade.base.AbstractEntityFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.service.contract.CustomerService;
import com.espindola.lobwebapp.service.contract.OrderService;
import com.espindola.lobwebapp.service.contract.ProductService;
import com.espindola.lobwebapp.service.contract.StockService;
import com.espindola.lobwebapp.validation.util.CustomObjectError;
import com.espindola.lobwebapp.validation.util.ErrorCode;

@Transactional
@Component
public class OrderFacade extends AbstractEntityFacade<Order> {

	private OrderService orderService;
	private CustomerService customerService;
	private ProductService productService;
	private StockService stockService;

	public OrderFacade() {
		super(null);
	}

	@Autowired
	public OrderFacade(OrderService orderService,
			ProductService productService, CustomerService customerService,
			StockService stockService) {
		super(orderService);
		this.orderService = orderService;
		this.productService = productService;
		this.customerService = customerService;
		this.stockService = stockService;
	}

	@Override
	public Order save(Order entity) throws AlreadyExistsException,
			InvalidArgumentException {
		throwIfCustomerNotExists(entity);
		throwIfInvalidOrderItem(entity);

		updateStockQuantity(entity);

		return super.save(entity);
	}

	@Override
	public Order update(Order entity) throws NotFoundException,
			InvalidArgumentException {
		throwIfCustomerNotExists(entity);
		throwIfInvalidOrderItem(entity);

		updateStockQuantity(entity);

		return super.update(entity);
	}

	private void throwIfInvalidOrderItem(Order entity)
			throws InvalidArgumentException {
		for (OrderItem item : entity.getItems()) {
			if (!productService.exists(item.getProduct().getId()))
				throw new InvalidArgumentException(MessageKey.ORDERITEM,
						new CustomObjectError(ErrorCode.REQUIRED,
								MessageKey.VALIDATION_INVALID, "product"));
		}
	}

	private void throwIfCustomerNotExists(Order entity) {
		if (!customerService.exists(entity.getCustomer().getId()))
			throw new InvalidArgumentException(MessageKey.ORDER,
					new CustomObjectError(ErrorCode.REQUIRED,
							MessageKey.VALIDATION_INVALID, "customer"));
	}

	private void updateStockQuantity(Order entity) {
		Order previousOrder = null;
		if (orderService.exists(entity.getId()))
			previousOrder = orderService.find(entity.getId());
		for (OrderItem item : entity.getItems()) {
			try {
				Stock itemStock = stockService.findByProductId(item
						.getProduct().getId());
				int newQuantity = -1;
				if (previousOrder == null) {
					newQuantity = itemStock.getQuantity() - item.getQuantity();
				} else {
					for (OrderItem previousItem : previousOrder.getItems()) {
						if (previousItem.getProduct().getId()
								.equals(item.getProduct().getId())) {
							int restoredQuantity = itemStock.getQuantity()
									+ previousItem.getQuantity();
							newQuantity = restoredQuantity - item.getQuantity();
						}
					}
				}
				if (newQuantity < 0)
					throw new InvalidArgumentException(MessageKey.STOCK,
							new CustomObjectError(ErrorCode.INVALID,
									MessageKey.VALIDATION_MIN,
									"quantity", Math.abs(newQuantity)));
				itemStock.setQuantity(newQuantity);
				stockService.update(itemStock);
			} catch (NotFoundException ex) {
				throw ex;
			}
		}
	}
}