package de.ostfalia.serp24.repository;

import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.Entry;
import de.ostfalia.serp24.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TimeRepository extends JpaRepository<Entry, Long> {
    @Query("select e from Entry e where e.consultant.id = :consultantId")
    List<Entry> findByConsultantId(@Param("consultantId")Long consultantId);
    @Query("select distinct e.project from Entry e")
    List<Project> findAllProjects();
    @Query("select distinct e.consultant from Entry e")
    List<Consultant> findAllConsultants();
}
