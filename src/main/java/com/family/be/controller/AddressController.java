package com.family.be.controller;

import com.family.be.dto.request.AddressRequest;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/address")
public class AddressController {
    private final AddressService addressService;

    @PostMapping("/user/add")
    public ResponseEntity<ResponseMessage> doPostAddress(@RequestBody AddressRequest addressRequest) {
        try {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("Api add address was successfully !")
                    .createAt(new Date())
                    .data(addressService.addNewAddress(addressRequest))
                    .build(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("Api add address not was successfully !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> doDelete(@PathVariable Long id) {
        try {
            addressService.deleteAddress(id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("Api delete address was successfully !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("Api delete address not was successfully !")
                    .createAt(new Date())
                    .data(e.getMessage())
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> doUpdate(
            @PathVariable Long id,
            @RequestBody AddressRequest addressRequest) {
        try {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("Api update address was successfully !")
                    .createAt(new Date())
                    .data(addressService.updateAddress(addressRequest, id))
                    .build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("Api delete address not was successfully !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
