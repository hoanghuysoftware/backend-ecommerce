package com.family.be.repository;

import com.family.be.dto.request.SaleRequest;
import com.family.be.models.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SaleRepository  extends JpaRepository<Sale, Long> {
    Optional<Sale> findSaleById(Long id);
    boolean existsByNameSale(String name);
}
