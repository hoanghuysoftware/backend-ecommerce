package com.family.be.service.serviceIMPL;

import com.family.be.models.Brand;
import com.family.be.models.Product;
import com.family.be.repository.ProductRepository;
import com.family.be.service.BrandService;
import com.family.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceIMPL implements ProductService {
    private final ProductRepository productRepository;
    private final BrandService brandService;
    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.getProductById(id).get();
    }

    @Override
    public List<Product> getProductByBrand(String nameBrand) {
        Brand brandSearch = brandService.getABrandByName(nameBrand);
        return productRepository.findProductByBrand(brandSearch);
    }

    @Override
    public Page<Product> searchProductByName(String nameProduct, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        long totalElements = productRepository.countProductByNameProductContains(nameProduct);
        return productRepository.findProductByNameProductContains(nameProduct, pageable);
    }

    @Override
    public List<Product> getAllProductSales() {
        return productRepository.getProductsBySaleNotEmpty();
    }
}
