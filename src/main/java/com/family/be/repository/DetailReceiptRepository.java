package com.family.be.repository;

import com.family.be.models.DetailReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailReceiptRepository extends JpaRepository<DetailReceipt, Long> {
}
