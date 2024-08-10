package com.family.be.repository;

import com.family.be.models.Importer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImporterRepository  extends JpaRepository<Importer, Long> {
    Optional<Importer> findImporterById(Long id);
    @Query("select i from Importer i where i.nameImporter = :name")
    Importer findImporterByNameImporter(String name);
}
