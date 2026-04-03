package com.featuretoggle.dashboard.controller;

import com.featuretoggle.dashboard.dto.FeatureRequest;
import com.featuretoggle.dashboard.dto.FeatureResponse;
import com.featuretoggle.dashboard.service.FeatureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/features")
@RequiredArgsConstructor
public class FeatureController {

    private final FeatureService featureService;

    @GetMapping
    public ResponseEntity<List<FeatureResponse>> getAll() {
        return ResponseEntity.ok(featureService.getAll());
    }

    @GetMapping("/env/{environmentId}")
    public ResponseEntity<List<FeatureResponse>> getByEnvironment(@PathVariable UUID environmentId) {
        return ResponseEntity.ok(featureService.getByEnvironment(environmentId));
    }

    @PostMapping
    public ResponseEntity<FeatureResponse> create(@RequestBody @Valid FeatureRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(featureService.create(request));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<FeatureResponse> toggle(@PathVariable UUID id) {
        return ResponseEntity.ok(featureService.toggle(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeatureResponse> update(@PathVariable UUID id,
            @RequestBody @Valid FeatureRequest request) {
        return ResponseEntity.ok(featureService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        featureService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{featureId}/check/{userId}")
    public ResponseEntity<Boolean> checkRollout(@PathVariable UUID featureId,
            @PathVariable String userId) {
        return ResponseEntity.ok(featureService.isFeatureEnabledForUser(featureId, userId));
    }
}