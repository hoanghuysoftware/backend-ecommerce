package com.family.be.repository;

import com.family.be.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findAccountById(Long id);
    Optional<Account> findAllByUsername(String username);
    boolean existsByUsername(String username);
}
