package com.family.be.repository;

import com.family.be.models.DetailsCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailsCartRepository extends JpaRepository<DetailsCart, Long> {
}
