package com.featuretoggle.dashboard.dto;

import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnvironmentResponse {

    private UUID id;
    private String name;
}
