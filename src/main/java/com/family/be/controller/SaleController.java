package com.family.be.controller;

import com.family.be.dto.request.SaleRequest;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.models.Sale;
import com.family.be.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/sale")
public class SaleController {
    private final SaleService saleService;

    @GetMapping
    public ResponseEntity<ResponseMessage> doGetALlSale(){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API GET ALL SALE SUCCESSFULLY !")
                .createAt(new Date())
                .data(saleService.getAllSale())
                .build(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> doGetSaleById(@PathVariable Long id){
        Optional<Sale> sale = saleService.getSaleById(id);
        if (sale.isEmpty()){
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("NOT FOUND SALE BY ID: "+ id +" !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API GET SALE SUCCESSFULLY !")
                .createAt(new Date())
                .data(saleService.getSaleById(id))
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable Long id){
        return  new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API delete successfully")
                .createAt(new Date())
                .data(saleService.deleteSaleById(id))
                .build(),HttpStatus.NO_CONTENT);
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> doCreateNewSale(@RequestBody SaleRequest saleRequest){
        boolean existsNameSale = saleService.existsSaleByName(saleRequest.getNameSale());
        if (existsNameSale){
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("NAME SALE ALREADY EXISTS !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API CREATE SALE SUCCESSFULLY !")
                .createAt(new Date())
                .data(saleService.createNewSale(saleRequest))
                .build(), HttpStatus.CREATED);
    }
}
