package com.family.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DetailsOrderRequest {
    private Long priceOrder;
    private int quantityOrder;
    private Long idProduct;
}
