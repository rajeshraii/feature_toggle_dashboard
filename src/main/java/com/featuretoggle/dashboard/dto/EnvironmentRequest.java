package com.featuretoggle.dashboard.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnvironmentRequest {

    @NotBlank(message = "Environment name is required")
    private String name;
}