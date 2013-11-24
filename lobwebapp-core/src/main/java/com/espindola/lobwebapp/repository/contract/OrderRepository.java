package com.espindola.lobwebapp.repository.contract;

import org.springframework.stereotype.Repository;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.repository.contract.base.EntityRepository;

@Repository
public interface OrderRepository extends EntityRepository<Order> {

}
