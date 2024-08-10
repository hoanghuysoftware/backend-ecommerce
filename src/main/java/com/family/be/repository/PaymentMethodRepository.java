package com.family.be.repository;

import com.family.be.models.PayMethod;
import com.family.be.models.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
    PaymentMethod findPaymentMethodById(Long id);
    PaymentMethod findPaymentMethodByNameMethod(PayMethod namePay);
}
