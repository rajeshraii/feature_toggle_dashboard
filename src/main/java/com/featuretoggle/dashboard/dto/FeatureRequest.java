package com.featuretoggle.dashboard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeatureRequest {

    @NotBlank(message = "Feature name is required")
    private String name;

    private String description;

    @Builder.Default
    private boolean enabled = false;

    @NotNull(message = "Environment ID is required")
    private UUID environmentId;
}