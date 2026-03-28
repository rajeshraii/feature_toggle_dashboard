package com.featuretoggle.dashboard.service;

import com.featuretoggle.dashboard.dto.EnvironmentRequest;
import com.featuretoggle.dashboard.dto.EnvironmentResponse;
import com.featuretoggle.dashboard.model.Environment;
import com.featuretoggle.dashboard.repository.EnvironmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@SuppressWarnings("null")
@RequiredArgsConstructor
public class EnvironmentService {

    private final EnvironmentRepository environmentRepository;

    public List<EnvironmentResponse> getAll() {
        return environmentRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public EnvironmentResponse create(EnvironmentRequest request) {
        if (environmentRepository.existsByName(request.getName())) {
            throw new RuntimeException("Environment already exists: " + request.getName());
        }
        Environment env = Environment.builder()
                .name(request.getName())
                .build();
        return toResponse(environmentRepository.save(env));
    }

    public void delete(UUID id) {
        if (!environmentRepository.existsById(id)) {
            throw new RuntimeException("Environment not found: " + id);
        }
        environmentRepository.deleteById(id);
    }

    private EnvironmentResponse toResponse(Environment env) {
        return EnvironmentResponse.builder()
                .id(env.getId())
                .name(env.getName())
                .build();
    }
}