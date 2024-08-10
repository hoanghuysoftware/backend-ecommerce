package com.family.be.repository;

import com.family.be.models.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Long> {
    Optional<ProductAttribute> findProductAttributeById(Long id);

    boolean existsProductAttributeByNameAttribute(String name);
}
