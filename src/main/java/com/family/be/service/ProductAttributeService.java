package com.family.be.service;

import com.family.be.dto.request.ProductAttributeReq;
import com.family.be.models.ProductAttribute;

import java.util.List;
import java.util.Optional;

public interface ProductAttributeService {
    Optional<ProductAttribute> findProductAttributeById(Long id);
    List<ProductAttribute> getAllProductAttribute();
    ProductAttribute createNewProductAttribute(ProductAttributeReq productAttributeReq);
    boolean existsProductAttributeByName(String name);
}
