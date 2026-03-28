package com.featuretoggle.dashboard.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeatureResponse {

    private UUID id;
    private String name;
    private String description;
    private boolean enabled;
    private UUID environmentId;
    private String environmentName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}