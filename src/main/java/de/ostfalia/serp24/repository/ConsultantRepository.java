package de.ostfalia.serp24.repository;

import de.ostfalia.serp24.model.Consultant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {
}
