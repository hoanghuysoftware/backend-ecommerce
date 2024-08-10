package com.family.be.controller;

import com.family.be.dto.request.SignIn;
import com.family.be.dto.request.SignUp;
import com.family.be.dto.response.JwtResponse;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.models.Account;
import com.family.be.models.Customer;
import com.family.be.models.RoleName;
import com.family.be.repository.AccountRepository;
import com.family.be.repository.CustomerRepository;
import com.family.be.security.jwt.JwtProvider;
import com.family.be.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/auth/")
@RequiredArgsConstructor
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final CustomerRepository customerRepository;
    private final CustomerService customerService;
    private final AccountRepository accountRepository;


    @GetMapping
    public ResponseEntity<ResponseMessage> doTest() {
        return ResponseEntity.ok(ResponseMessage.builder()
                .status("TRUE")
                .message("OK")
                .data("Test auth ok !")
                .build());
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> doSignIn(@RequestBody SignIn signIn) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signIn.getUsername(),
                        signIn.getPassword()
                )
        );
        if (authentication != null) {
            Account account = accountRepository.findAllByUsername(signIn.getUsername()).orElseThrow(null);
            Customer user = customerRepository.getCustomerByAccount_Id(account.getId()).orElseThrow(null);
            String token = jwtProvider.generateToken(authentication);
            return new ResponseEntity<>(JwtResponse.builder()
                    .status("TRUE")
                    .message("Login successful !")
                    .createAt(new Date())
                    .type("Bearer ")
                    .idUser(user.getId())
                    .token(token)
                    .build(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("Username or password is incorrect !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/sign-up")
    public ResponseEntity<ResponseMessage> doSignUp(@RequestBody SignUp signUp){
        boolean existUsername = accountRepository.existsByUsername(signUp.getUsername());
        if (existUsername){
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("Username already exists")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }

        boolean existEmail = customerRepository.existsByEmailCus(signUp.getEmail());
        if (existEmail){
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("Email already exists")
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
