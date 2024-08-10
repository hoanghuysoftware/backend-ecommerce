package com.family.be.service;

import com.family.be.dto.request.SignUp;
import com.family.be.models.Customer;

import java.util.List;

public interface CustomerService {
    Customer createNewCustomer(SignUp signUp);
    boolean existsCustomerByName(String name);
    boolean existsCustomerByEmail(String email);
    List<Customer> getAllCustomer();
    Customer getACustomerByID(Long id);
}
