package com.family.be.service;

import com.family.be.dto.request.BrandRequest;
import com.family.be.models.Brand;

import java.util.List;
import java.util.Optional;

public interface BrandService {
    Brand createNewBrand(BrandRequest brandRequest);
    List<Brand> getAllBrand();
    Brand getABrandByName(String name);
    Optional<Brand> getABrandById(Long id);
}
