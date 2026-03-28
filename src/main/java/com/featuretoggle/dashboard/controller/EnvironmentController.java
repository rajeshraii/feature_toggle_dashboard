package com.featuretoggle.dashboard.controller;

import com.featuretoggle.dashboard.dto.EnvironmentRequest;
import com.featuretoggle.dashboard.dto.EnvironmentResponse;
import com.featuretoggle.dashboard.service.EnvironmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/environments")
@RequiredArgsConstructor
public class EnvironmentController {

    private final EnvironmentService environmentService;

    @GetMapping
    public ResponseEntity<List<EnvironmentResponse>> getAll() {
        return ResponseEntity.ok(environmentService.getAll());
    }

    @PostMapping
    public ResponseEntity<EnvironmentResponse> create(@RequestBody @Valid EnvironmentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(environmentService.create(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        environmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}