package com.family.be.controller;

import com.family.be.dto.request.OrderRequest;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.repository.AccountRepository;
import com.family.be.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/order")
public class OrderController {
    private final OrderService orderService;
    private final AccountRepository accountRepository;
    public static final Logger log = LoggerFactory.getLogger(OrderController.class);
//    @GetMapping("/test/test/{name}")
//    public ResponseEntity<ResponseMessage> doGetAllTest(@PathVariable String name){
//        return new ResponseEntity<>(ResponseMessage.builder()
//                .status("TRUE")
//                .message("Api get all order successfully !")
//                .createAt(new Date())
//                .data(accountRepository.findAllByUsername(name))
//                .build(), HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<ResponseMessage> doGetAll(){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("Api get all order successfully !")
                .createAt(new Date())
                .data(orderService.getAllOrder())
                .build(), HttpStatus.OK);
    }
    @GetMapping("/customer/{id}")
    public ResponseEntity<ResponseMessage> doGetByCustomer(@PathVariable Long id){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("Api get a order by customer ID successfully !")
                .createAt(new Date())
                .data(orderService.getOrderInfoByCustomer(id))
                .build(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> doGetById(@PathVariable Long id){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("Api get a order by customer ID successfully !")
                .createAt(new Date())
                .data(orderService.getOrderById(id))
                .build(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> doCreateNewOrder(@RequestBody OrderRequest orderRequest){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("APi create new order successfully !")
                .createAt(new Date())
                .data(orderService.createNewOrder(orderRequest))
                .build(), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResponseMessage> doUpdateOrderStatus(@PathVariable Long id,
                                                               @RequestParam(name = "orderStatus")int orderStatus){
        try {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("APi update status order successfully !")
                    .createAt(new Date())
                    .data(orderService.updateOrderStatus(id, orderStatus))
                    .build(), HttpStatus.OK);
        }catch (Exception e){
            log.error("APi update status order NOT successfully !\n"+e.getMessage());
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("APi update status order NOT successfully !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/payment/{idOrder}")
    public ResponseEntity<ResponseMessage> doUpdateOrderStatus(@PathVariable Long idOrder,
                                                               @RequestParam(name = "orderStatusPay") long orderStatusPay){
        boolean status = false;
        if (orderStatusPay ==1){
            status = true;
        }
        try {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("API UPDATE ORDER STATUS PAYMENT SUCCESSFULLY !")
                    .createAt(new Date())
                    .data(orderService.updateOrderStatusPay(idOrder, status))
                    .build(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("API UPDATE ORDER STATUS PAYMENT NOT SUCCESSFULLY !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_MODIFIED);
        }
    }
}
