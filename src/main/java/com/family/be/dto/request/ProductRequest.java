package com.family.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private String nameProduct;
    private String cpuProduct;
    private String ramProduct;
    private String screenProduct;
    private String romProduct;
    private String cardProduct;
    private String descProduct;
    private Long priceProduct;
    private int quantityProduct;
    private List<Long> attributeIds;
    private Long brandId;
    private List<byte[]> images;
}
