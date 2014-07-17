package com.espindola.lobwebapp.repository;

import org.springframework.stereotype.Repository;

import com.espindola.lobwebapp.domain.Order;
import com.espindola.lobwebapp.repository.base.EntityRepository;

@Repository
public interface OrderRepository extends EntityRepository<Order> {

}
