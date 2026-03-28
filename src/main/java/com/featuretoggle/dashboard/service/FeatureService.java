package com.featuretoggle.dashboard.service;

import com.featuretoggle.dashboard.dto.FeatureRequest;
import com.featuretoggle.dashboard.dto.FeatureResponse;
import com.featuretoggle.dashboard.model.Environment;
import com.featuretoggle.dashboard.model.Feature;
import com.featuretoggle.dashboard.repository.EnvironmentRepository;
import com.featuretoggle.dashboard.repository.FeatureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@SuppressWarnings("null")
@RequiredArgsConstructor
public class FeatureService {

    private final FeatureRepository featureRepository;
    private final EnvironmentRepository environmentRepository;

    public List<FeatureResponse> getAll() {
        return featureRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<FeatureResponse> getByEnvironment(UUID environmentId) {
        return featureRepository.findByEnvironmentId(environmentId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public FeatureResponse create(FeatureRequest request) {
        Environment env = environmentRepository.findById(request.getEnvironmentId())
                .orElseThrow(() -> new RuntimeException("Environment not found: " + request.getEnvironmentId()));

        if (featureRepository.existsByNameAndEnvironmentId(request.getName(), request.getEnvironmentId())) {
            throw new RuntimeException("Feature already exists in this environment: " + request.getName());
        }

        Feature feature = Feature.builder()
                .name(request.getName())
                .description(request.getDescription())
                .enabled(request.isEnabled())
                .environment(env)
                .build();

        return toResponse(featureRepository.save(feature));
    }

    public FeatureResponse toggle(UUID id) {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feature not found: " + id));
        feature.setEnabled(!feature.isEnabled());
        return toResponse(featureRepository.save(feature));
    }

    public FeatureResponse update(UUID id, FeatureRequest request) {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feature not found: " + id));

        Environment env = environmentRepository.findById(request.getEnvironmentId())
                .orElseThrow(() -> new RuntimeException("Environment not found: " + request.getEnvironmentId()));

        feature.setName(request.getName());
        feature.setDescription(request.getDescription());
        feature.setEnabled(request.isEnabled());
        feature.setEnvironment(env);

        return toResponse(featureRepository.save(feature));
    }

    public void delete(UUID id) {
        if (!featureRepository.existsById(id)) {
            throw new RuntimeException("Feature not found: " + id);
        }
        featureRepository.deleteById(id);
    }

    private FeatureResponse toResponse(Feature feature) {
        return FeatureResponse.builder()
                .id(feature.getId())
                .name(feature.getName())
                .description(feature.getDescription())
                .enabled(feature.isEnabled())
                .environmentId(feature.getEnvironment().getId())
                .environmentName(feature.getEnvironment().getName())
                .createdAt(feature.getCreatedAt())
                .updatedAt(feature.getUpdatedAt())
                .build();
    }
}