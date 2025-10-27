package de.ostfalia.serp24.service;

import de.ostfalia.serp24.Exceptions.NotFoundException;
import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.Customer;
import de.ostfalia.serp24.model.Project;
import de.ostfalia.serp24.model.ProjectConsultant;
import de.ostfalia.serp24.repository.ConsultantRepository;
import de.ostfalia.serp24.repository.ProjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ConsultantRepository consultantRepository;
    private ModelMapper modelMapper;

    public ProjectService(ProjectRepository projectRepository, ModelMapper modelMapper, ConsultantRepository consultantRepository) {
        this.projectRepository = projectRepository;
        this.modelMapper = modelMapper;
        this.consultantRepository = consultantRepository;
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public Project save(Project project) {
        if (project.getProjectStaff() != null) {
            for (ProjectConsultant pc : project.getProjectStaff()) {
                pc.setId(null); //force new relation
                Consultant managedConsultant = consultantRepository.findById(pc.getConsultant().getId())
                        .orElseThrow(() -> new NotFoundException("Consultant not found"));
                pc.setConsultant(managedConsultant);
                pc.setProject(project);
            }
        }
        return projectRepository.save(project);
    }

    public Project findById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + id));
    }

    public Project updateById(Long id, Project project) {
        if (!projectRepository.existsById(id)) {
            throw new NotFoundException("Project not found with id: " + id);
        } else {
            Project projectToUpdate = findById(id);

            // update basic fields
            projectToUpdate.setName(project.getName());
            projectToUpdate.setStart(project.getStart());
            projectToUpdate.setEnd(project.getEnd());
            projectToUpdate.setStatus(project.getStatus());
            if (project.getCustomer() != null) {
                projectToUpdate.setCustomer(project.getCustomer());
            }

            // only sync staff if provided (null = no change, empty = remove all)
            if (project.getProjectStaff() != null) {
                // remove projectconsultants if not in new list
                projectToUpdate.getProjectStaff().removeIf(existingPC ->
                        project.getProjectStaff().stream()
                                .noneMatch(dtoPC ->
                                        (dtoPC.getId() != null && existingPC.getId().equals(dtoPC.getId())) ||
                                                (dtoPC.getConsultant() != null && existingPC.getConsultant().getId().equals(dtoPC.getConsultant().getId()))
                                )
                );

                // add new projectconsultants
                for (ProjectConsultant pc : project.getProjectStaff()) {
                    boolean alreadyExists = projectToUpdate.getProjectStaff().stream()
                            .anyMatch(existing ->
                                    (pc.getId() != null && existing.getId().equals(pc.getId())) ||
                                            existing.getConsultant().getId().equals(pc.getConsultant().getId())
                            );

                    if (!alreadyExists) {
                        Consultant managedConsultant = consultantRepository.findById(pc.getConsultant().getId())
                                .orElseThrow(() -> new NotFoundException("Consultant not found"));
                        ProjectConsultant newPC = new ProjectConsultant();
                        newPC.setConsultant(managedConsultant);
                        newPC.setProject(projectToUpdate);
                        projectToUpdate.getProjectStaff().add(newPC);
                    }
                }
            }

            return projectRepository.save(projectToUpdate);
        }
    }

    public void deleteById(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new NotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    public List<Project> findProjectsByConsultantId(Long id) {
        Consultant consultant = consultantRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Consultant not found with id: " + id));
        List<Long> projectIds = consultant.getBookedProjects().stream().map(pc -> pc.getProject().getId()).toList();
        return projectRepository.findAllById(projectIds);
    }

    public List<Customer> findAllCustomers() {
        return projectRepository.findAllCustomers();
    }

    public List<Consultant> findAllConsultants() {
        return projectRepository.findAllConsultants();
    }
}