package com.family.be.service.serviceIMPL;

import com.family.be.dto.request.SignUp;
import com.family.be.models.*;
import com.family.be.repository.AccountRepository;
import com.family.be.repository.AddressRepository;
import com.family.be.repository.CustomerRepository;
import com.family.be.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceIMPL implements CustomerService {
    private static final Logger log = LoggerFactory.getLogger(CustomerServiceIMPL.class);
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;
    private final AccountRepository accountRepository;
    @Override
    public boolean existsCustomerByName(String name) {
        return customerRepository.existsByNameCustomer(name);
    }

    @Override
    public boolean existsCustomerByEmail(String email) {
        return customerRepository.existsByEmailCus(email);
    }

    @Override
    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getACustomerByID(Long id) {
        return customerRepository.findCustomerById(id);
    }

    @Override
    public Customer createNewCustomer(SignUp signUp) {
        Customer customer = Customer.builder()
                .nameCustomer(signUp.getNameRequest())
                .birthDayCus(signUp.getBirthDay())
                .emailCus(signUp.getEmail())
                .phoneNumber(signUp.getPhoneNumber())
                .gender(signUp.isGender())
                .build();

        List<Address> addressList = new ArrayList<>();
        Address address = Address.builder()
                .dataAddress(signUp.getAddress())
                .customer(customer)
                .build();
        addressList.add(address);
        customer.setAddresses(addressList);

        Account account = Account.builder()
                .username(signUp.getUsername())
                .password(passwordEncoder.encode(signUp.getPassword())) // password chua encode
                .roleName(RoleName.valueOf(signUp.getRoleName()))
                .build();
        customer.setAccount(account);

        Cart cart = Cart.builder()
                .priceCart(0L)
                .quantityCart(0)
                .build();
        customer.setCart(cart);

        return customerRepository.save(customer);
    }



}
