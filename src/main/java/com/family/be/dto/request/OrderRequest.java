package com.family.be.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private Long idCustomer;
    private String noteOrder;
    private boolean statusPay;
    private String payMethod;
    private int orderStatus;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date dateOrder;
    private String shippingAddress;
    private List<DetailsOrderRequest> orderRequests = new ArrayList<>();
}
