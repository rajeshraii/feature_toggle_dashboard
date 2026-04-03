package com.featuretoggle.dashboard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.UUID;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

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

    @Builder.Default
    @Min(0)
    @Max(100)
    private int rolloutPercentage = 100;
}