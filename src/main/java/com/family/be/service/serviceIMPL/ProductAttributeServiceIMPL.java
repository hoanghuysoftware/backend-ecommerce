package com.family.be.service.serviceIMPL;

import com.family.be.dto.request.ProductAttributeReq;
import com.family.be.models.ProductAttribute;
import com.family.be.repository.ProductAttributeRepository;
import com.family.be.service.ProductAttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductAttributeServiceIMPL implements ProductAttributeService {
    private final ProductAttributeRepository productAttributeRepository;

    @Override
    public Optional<ProductAttribute> findProductAttributeById(Long id) {
        return productAttributeRepository.findProductAttributeById(id);
    }

    @Override
    public List<ProductAttribute> getAllProductAttribute() {
        return productAttributeRepository.findAll();
    }

    @Override
    public ProductAttribute createNewProductAttribute(ProductAttributeReq productAttributeReq) {
        return productAttributeRepository.save(ProductAttribute.builder()
                .nameAttribute(productAttributeReq.getNameAttribute())
                .build());
    }

    @Override
    public boolean existsProductAttributeByName(String name) {
        return productAttributeRepository.existsProductAttributeByNameAttribute(name);
    }

}
