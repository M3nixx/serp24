package de.ostfalia.serp24.repository;

import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
