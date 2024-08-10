package com.family.be.service;

import com.family.be.dto.request.ImporterRequest;
import com.family.be.models.Importer;

import java.util.List;
import java.util.Optional;

public interface ImporterService {
    Importer createNewImporter(ImporterRequest importerRequest);
    List<Importer> getAllImporter();
    Optional<Importer> getAImporterById(Long id);
    Importer getImporterByName(String name);
}
