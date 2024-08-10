package com.family.be.controller;

import com.family.be.dto.request.CartRequest;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.service.CartService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {
    private static final Logger log = LoggerFactory.getLogger(CartController.class);
    private final CartService cartService;

    @PostMapping("/{idCustomer}")
    public ResponseEntity<ResponseMessage> doAddProductToCart(@PathVariable Long idCustomer,
                                                              @RequestBody CartRequest cartRequest) {
        try {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("APi add product to cart successfully !")
                    .createAt(new Date())
                    .data(cartService.addProductIntoCart(cartRequest, idCustomer))
                    .build(), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("APi add product to cart not successfully !\nAt CartController.java");
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("APi add product to cart not successfully !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @DeleteMapping("/{idCustomer}/{idProduct}")
    public ResponseEntity<ResponseMessage> doDelete(@PathVariable Long idCustomer,
                                                    @PathVariable Long idProduct) {
        try {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("APi delete product in cart successfully !")
                    .createAt(new Date())
                    .data(cartService.deleteProductInCart(idProduct, idCustomer))
                    .build(), HttpStatus.OK);
        } catch (Exception e) {
            log.error("APi delete product in cart not successfully !\nAt CartController.java");
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("APi delete product in cart not successfully !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PatchMapping("/update/user/{idCustomer}/product/{idProduct}/quantity/{quantity}")
    public ResponseEntity<ResponseMessage> doUpdateQuantity(@PathVariable Long idCustomer,
                                                            @PathVariable Long idProduct,
                                                            @PathVariable Long quantity) {
        try {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("APi update quantity product in cart successfully !")
                    .createAt(new Date())
                    .data(cartService.updateQuantityInCart(idCustomer, idProduct, quantity))
                    .build(), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error while updating quantity for product " + idProduct + " with quantity " + quantity);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("APi delete product in cart not successfully !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
