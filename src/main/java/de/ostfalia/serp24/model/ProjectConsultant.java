package de.ostfalia.serp24.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;


@Entity
@Getter
@Setter
public class ProjectConsultant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name="consultant_id")
    private Consultant consultant;

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        ProjectConsultant that = (ProjectConsultant) object;
        return Objects.equals(project.getId(), that.project.getId()) && Objects.equals(consultant.getId(), that.consultant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(project.getId(), consultant.getId());
    }
}
