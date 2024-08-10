package com.family.be.controller;

import com.family.be.dto.response.ResponseMessage;
import com.family.be.models.Product;
import com.family.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ResponseMessage> doGetAll() {
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API GET  ALL PRODUCT SUCCESSFULLY!")
                .createAt(new Date())
                .data(productService.getAllProduct())
                .build(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> doGetAById(@PathVariable Long id) {
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API GET  A PRODUCT BY ID SUCCESSFULLY!")
                .createAt(new Date())
                .data(productService.getProductById(id))
                .build(), HttpStatus.OK);
    }


    @GetMapping("/by-brand")
    public ResponseEntity<ResponseMessage> doGetByBrand(@RequestParam("nameBrand") String nameBrand) {
        List<Product> listResult = productService.getProductByBrand(nameBrand);
        if (listResult.isEmpty()) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FALSE")
                    .message("API GET  A PRODUCT BY BRAND NOT SUCCESSFULLY!")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("API GET  A PRODUCT BY BRAND SUCCESSFULLY!")
                    .createAt(new Date())
                    .data(productService.getProductByBrand(nameBrand))
                    .build(), HttpStatus.OK);
        }
    }
    @GetMapping("/search")
    public ResponseEntity<ResponseMessage> doGetBySearch(@RequestParam("name-product") String nameProduct,
                                                         @RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size) {
        try {
            ResponseMessage response = ResponseMessage.builder()
                    .status("TRUE")
                    .message("API SEARCH PRODUCT BY NAME SUCCESSFULLY !")
                    .createAt(new Date())
                    .data(productService.searchProductByName(nameProduct, page, size)) // Chú ý sử dụng getContent() thay vì toàn bộ Page
                    .build();
            return ResponseEntity.ok()
                    .header("X-Total-Count", String.valueOf(productService.searchProductByName(nameProduct, page, size).getTotalElements()))
                    .body(response);
        }catch (Exception e){
            return new ResponseEntity<>(ResponseMessage.builder()
                   .status("FALSE")
                   .message("NOT FOUND PRODUCT NAME: "+nameProduct)
                   .createAt(new Date())
                   .data("")
                   .build(), HttpStatus.OK);
        }
    }
    @GetMapping("/sale")
    public ResponseEntity<ResponseMessage> getProductHaveSale(){
        return new ResponseEntity<>(ResponseMessage.builder()
               .status("TRUE")
               .message("API GET PRODUCT HAVE SALE SUCCESSFULLY!")
               .createAt(new Date())
               .data(productService.getAllProductSales())
               .build(), HttpStatus.OK);
    }
}
