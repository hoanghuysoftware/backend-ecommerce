package com.family.be.repository;

import com.family.be.models.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    Optional<Brand> findBrandById(Long id);
    @Query("select b from Brand b where b.nameBrand = :name")
    Brand findBrandByNameBrand(String name);
}
