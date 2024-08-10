package com.family.be.service.serviceIMPL;

import com.family.be.dto.request.BrandRequest;
import com.family.be.models.Brand;
import com.family.be.repository.BrandRepository;
import com.family.be.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BrandServiceIMPL implements BrandService {
    private final BrandRepository brandRepository;

    @Override
    public Brand createNewBrand(BrandRequest brandRequest) {
        return brandRepository.save(Brand.builder()
                .nameBrand(brandRequest.getNameBrand())
                .build());
    }

    @Override
    public List<Brand> getAllBrand() {
        return brandRepository.findAll();
    }

    @Override
    public Brand getABrandByName(String name) {
        return brandRepository.findBrandByNameBrand(name);
    }

    @Override
    public Optional<Brand> getABrandById(Long id) {
        return brandRepository.findBrandById(id);
    }
}
