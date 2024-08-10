package com.family.be.controller;

import com.family.be.dto.request.BrandRequest;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.models.Brand;
import com.family.be.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/brand")
public class BrandController {
    private final BrandService brandService;

    @GetMapping
    public ResponseEntity<ResponseMessage> doGetAll(){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API GET ALL BRAND SUCCESSFULLY !")
                .createAt(new Date())
                .data(brandService.getAllBrand())
                .build(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> doGetById(@PathVariable Long id){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API GET A BRAND BY ID SUCCESSFULLY !")
                .createAt(new Date())
                .data(brandService.getABrandById(id))
                .build(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> doCreateNewBrand(@RequestBody BrandRequest brandRequest){
        Brand brand = brandService.getABrandByName(brandRequest.getNameBrand());

        if (brand != null){
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("BRAND ALREADY EXISTS !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }else {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("API CREATE NEW BRAND SUCCESSFULLY !")
                    .createAt(new Date())
                    .data(brandService.createNewBrand(brandRequest))
                    .build(), HttpStatus.CREATED);
        }
    }
}
