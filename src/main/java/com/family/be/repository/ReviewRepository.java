package com.family.be.repository;

import com.family.be.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByProduct_Id(Long productId);
    boolean existsByOrder_Id(Long orderId);
}
