package com.family.be.controller;

import com.family.be.dto.request.ImporterRequest;
import com.family.be.dto.response.ResponseMessage;
import com.family.be.models.Importer;
import com.family.be.service.ImporterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/importer")
public class ImporterController {
    private final ImporterService importerService;

    @GetMapping
    public ResponseEntity<ResponseMessage> doGetAll(){
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API GET ALL IMPORTER SUCCESSFULLY !")
                .createAt(new Date())
                .data(importerService.getAllImporter())
                .build(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> doGetA(@PathVariable Long id){
        Optional<Importer> importer = importerService.getAImporterById(id);
        if (importer.isEmpty()){
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("NOT FOUND IMPORTER !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ResponseMessage.builder()
                .status("TRUE")
                .message("API GET A IMPORTER SUCCESSFULLY !")
                .createAt(new Date())
                .data(importerService.getAImporterById(id))
                .build(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<ResponseMessage> doCreateNewImporter(@RequestBody ImporterRequest importerRequest){
        Importer importer = importerService.getImporterByName(importerRequest.getNameImporter());

        if (importer != null){
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("FAILED")
                    .message("IMPORTER ALREADY EXISTS !")
                    .createAt(new Date())
                    .data("")
                    .build(), HttpStatus.NOT_ACCEPTABLE);
        }else {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .status("TRUE")
                    .message("API CREATE NEW IMPORTER SUCCESSFULLY !")
                    .createAt(new Date())
                    .data(importerService.createNewImporter(importerRequest))
                    .build(), HttpStatus.CREATED);
        }
    }
}
