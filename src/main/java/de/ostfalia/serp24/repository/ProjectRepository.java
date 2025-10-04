package de.ostfalia.serp24.repository;

import de.ostfalia.serp24.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
