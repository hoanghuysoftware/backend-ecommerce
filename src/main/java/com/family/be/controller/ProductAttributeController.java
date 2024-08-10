package com.family.be.controller;

import com.family.be.dto.request.ProductAttributeReq;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.service.ProductAttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product-attribute")
public class ProductAttributeController {
    private final ProductAttributeService productAttributeService;

    @GetMapping
    public ResponseEntity<ResponseMessage> doGetAll() {
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API GET ALL PRODUCT-ATTRIBUTE SUCCESSFULLY !")
                .createAt(new Date())
                .data(productAttributeService.getAllProductAttribute())
                .build(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> doGetById(@PathVariable Long id) {
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API GET PRODUCT-ATTRIBUTE SUCCESSFULLY !")
                .createAt(new Date())
                .data(productAttributeService.findProductAttributeById(id))
                .build(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> doCreateNewAttribute(@RequestBody ProductAttributeReq productAttributeReq) {
        boolean existsName = productAttributeService.existsProductAttributeByName(productAttributeReq.getNameAttribute());
        if (existsName){
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("API CREATE PRODUCT-ATTRIBUTE NOT SUCCESSFULLY !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API CREATE PRODUCT-ATTRIBUTE SUCCESSFULLY !")
                .createAt(new Date())
                .data(productAttributeService.createNewProductAttribute(productAttributeReq))
                .build(), HttpStatus.CREATED);

    }
}
