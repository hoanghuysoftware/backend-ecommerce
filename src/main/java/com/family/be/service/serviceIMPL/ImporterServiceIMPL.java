package com.family.be.service.serviceIMPL;

import com.family.be.dto.request.ImporterRequest;
import com.family.be.models.Importer;
import com.family.be.repository.ImporterRepository;
import com.family.be.service.ImporterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImporterServiceIMPL implements ImporterService {
    private final ImporterRepository importerRepository;
    @Override
    public Importer createNewImporter(ImporterRequest importerRequest) {
        return importerRepository.save(Importer.builder()
                        .nameImporter(importerRequest.getNameImporter())
                        .phoneImporter(importerRequest.getPhoneImporter())
                        .emailImporter(importerRequest.getEmailImporter())
                .build());
    }

    @Override
    public List<Importer> getAllImporter() {
        return importerRepository.findAll();
    }

    @Override
    public Optional<Importer> getAImporterById(Long id) {
        return importerRepository.findImporterById(id);
    }

    @Override
    public Importer getImporterByName(String name) {
        return importerRepository.findImporterByNameImporter(name);
    }

}
