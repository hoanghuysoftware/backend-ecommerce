package com.family.be.repository;

import com.family.be.models.Brand;
import com.family.be.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> getProductById(Long id);
    List<Product> findProductByBrand(Brand brand);
    Page<Product> findProductByNameProductContains(String name, Pageable pageable);
    long countProductByNameProductContains(String name);
    @Query("select p from Product p, Sale s where p.sale.id = s.id")
    List<Product> getProductsBySaleNotEmpty();
}
