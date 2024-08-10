package com.family.be.controller;

import com.family.be.dto.request.ReviewRequest;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ResponseMessage> doPost(@RequestBody ReviewRequest reviewRequest){
        return new ResponseEntity<>(ResponseMessage.builder()
               .status("TRUE")
               .message("Add review successfully !")
               .createAt(new Date())
               .data(reviewService.addReview(reviewRequest))
               .build(), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ResponseMessage> doGet(@RequestParam long id){
        return new ResponseEntity<>(ResponseMessage.builder()
               .status("TRUE")
               .message("Get all review by product id successfully !")
               .createAt(new Date())
               .data(reviewService.getAllReviewByIdProduct(id))
               .build(), HttpStatus.OK);
    }

    @GetMapping("/check/{idOrder}")
    public ResponseEntity<ResponseMessage> doGetByOrder(@PathVariable Long idOrder){
        return new ResponseEntity<>(ResponseMessage.builder()
               .status("TRUE")
               .message("Get all review by order id successfully !")
               .createAt(new Date())
               .data(reviewService.existsReviewBuOrderId(idOrder))
               .build(), HttpStatus.OK);
    }

}
