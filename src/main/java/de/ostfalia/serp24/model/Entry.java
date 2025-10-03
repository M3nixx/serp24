package de.ostfalia.serp24.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Getter
@Setter
public class Entry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long entryId;
    LocalDateTime date;
    int hours;

    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name="consultant_id")
    private Consultant consultant;
}
