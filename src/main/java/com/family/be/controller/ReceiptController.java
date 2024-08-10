package com.family.be.controller;

import com.family.be.dto.request.ReceiptRequest;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.service.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/receipt")
public class ReceiptController {
    private final ReceiptService receiptService;

    @GetMapping
    public ResponseEntity<ResponseMessage> doGetAll(){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("OK")
                .message("API get all receipt successfully !")
                .createAt(new Date())
                .data(receiptService.getAllReceipt())
                .build(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> doCreateNew(@RequestBody ReceiptRequest receiptRequest){
        try {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("OK")
                    .message("Import products successfully !")
                    .createAt(new Date())
                    .data(receiptService.createNewReceiptForProductExists(receiptRequest))
                    .build(), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("Failed")
                    .message("Import products not successfully !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/new")
    public ResponseEntity<ResponseMessage> doCreateNewProduct(@RequestBody ReceiptRequest receiptRequest){
        try {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("OK")
                    .message("Import new products successfully !")
                    .createAt(new Date())
                    .data(receiptService.createNewReceiptForProductNew(receiptRequest))
                    .build(), HttpStatus.CREATED);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("Failed")
                    .message("Import new products not successfully !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }
    }


}
