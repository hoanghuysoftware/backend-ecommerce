package com.family.be.controller;

import com.family.be.dto.request.SignUp;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.models.RoleName;
import com.family.be.service.AddressService;
import com.family.be.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/customer")
@RequiredArgsConstructor
public class CustomerController {
    private static final Logger log = LoggerFactory.getLogger(CustomerController.class);
    private final CustomerService customerService;

    @GetMapping
    public ResponseEntity<ResponseMessage> doGetAll(){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("Get all customer successfully !")
                .createAt(new Date())
                .data(customerService.getAllCustomer())
                .build(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> doGetAId(@PathVariable Long id){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("Get all customer successfully !")
                .createAt(new Date())
                .data(customerService.getACustomerByID(id))
                .build(), HttpStatus.OK);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<ResponseMessage> doCreateNewCustomer(@RequestBody SignUp signUp){
        boolean existsName = customerService.existsCustomerByName(signUp.getNameRequest());
        if (existsName){
            log.error("Name customer already exists !");
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("Name customer already exists !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }

        boolean existsEmail = customerService.existsCustomerByEmail(signUp.getEmail());
        if (existsEmail){
            log.error("Email customer already exists !");
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("Email customer already exists !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
        if(signUp.getRoleName().isEmpty()){
            signUp.setRoleName(RoleName.CUSTOMER.name());
        }

        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("Create new customer successfully !")
                .createAt(new Date())
                .data(customerService.createNewCustomer(signUp))
                .build(), HttpStatus.CREATED);
    }



}
