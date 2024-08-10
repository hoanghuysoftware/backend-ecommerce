package com.family.be.repository;

import com.family.be.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findCustomerById(Long id);
    Optional<Customer> getCustomerByAccount_Id(Long id);
    boolean existsByNameCustomer(String name);
    boolean existsByEmailCus(String email);
}
