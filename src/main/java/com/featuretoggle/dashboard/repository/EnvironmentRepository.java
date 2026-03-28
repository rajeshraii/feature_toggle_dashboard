package com.featuretoggle.dashboard.repository;

import com.featuretoggle.dashboard.model.Environment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EnvironmentRepository extends JpaRepository<Environment, UUID> {
    Optional<Environment> findByName(String name);
    boolean existsByName(String name);
}