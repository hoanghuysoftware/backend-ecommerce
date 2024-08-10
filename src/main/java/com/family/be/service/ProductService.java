package com.family.be.service;

import com.family.be.models.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    List<Product> getAllProduct();
    Product getProductById(Long id);
    List<Product> getProductByBrand(String nameBrand);
    Page<Product> searchProductByName(String nameProduct, int page, int size);

    List<Product> getAllProductSales();
}
