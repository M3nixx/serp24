package de.ostfalia.serp24.api;

import de.ostfalia.serp24.model.*;
import de.ostfalia.serp24.service.ProjectService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProjectApiDelegateImpl implements ProjectsApiDelegate {
    private ProjectService projectService;
    private ModelMapper modelMapper;

    public ProjectApiDelegateImpl(ProjectService projectService, ModelMapper mapper) {
        this.projectService = projectService;
        this.modelMapper = mapper;
    }

    @Override
    public ResponseEntity<List<ProjectDTO>> getProjects() {
        List<Project> projects = projectService.findAll();
        List<ProjectDTO> result;

        result = projects.stream()
                .map(this::mapToDTO)
                .toList();


        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<ProjectDTO> createProject(ProjectDTO ProjectDTO) {
        Project project = modelMapper.map(ProjectDTO, Project.class);
        project = projectService.save(project);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(mapToDTO(project));
    }

    @Override
    public ResponseEntity<ProjectDTO> getProject(Long id) {
        Project project = projectService.findById(id);

        return ResponseEntity.ok(mapToDTO(project));
    }

    @Override
    public ResponseEntity<ProjectDTO> updateProject(Long id, ProjectDTO projectDTO) {
//        Project project = modelMapper.map(projectDTO, Project.class);
        Project project = mapToProject(projectDTO);
        // fix ModelMapper empty list mapping to null
        if (projectDTO.getProjectStaff() != null && projectDTO.getProjectStaff().isEmpty()) {
            project.setProjectStaff(new ArrayList<>());
        }

        project = projectService.updateById(id, project);
        return ResponseEntity.ok(mapToDTO(project));
    }

    @Override
    public ResponseEntity<Void> deleteProject(Long id) {
        projectService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<List<ProjectDTO>> getProjectsByConsultant(Long id) {
        List<Project> projects = projectService.findProjectsByConsultantId(id);
        List<ProjectDTO> result;

        result = projects.stream()
                .map(this::mapToDTO)
                .toList();

        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<List<ProjectCustomerDTO>> getAllCustomers() {
        List<Customer> customers = projectService.findAllCustomers();
        List<ProjectCustomerDTO> result;

        result = customers.stream()
                .map(customer -> modelMapper.map(customer, ProjectCustomerDTO.class))
                .toList();

        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<List<ProjectConsultantDTO>> getAllConsultants() {
        List<Consultant> consultants = projectService.findAllConsultants();
        List<ProjectConsultantDTO> result;

        result = consultants.stream()
                .map(consultant -> modelMapper.map(consultant, ProjectConsultantDTO.class))
                .toList();

        return ResponseEntity.ok(result);
    }

    public Project mapToProject(ProjectDTO dto){
        if (dto == null) {
            return null;
        }

        Project project = new Project();

        project.setId(dto.getId());
        project.setName(dto.getName());
        project.setStart(dto.getStart());
        project.setEnd(dto.getEnd());
        project.setStatus(dto.getStatus());

        // --- Map Customer ---
        if (dto.getCustomer() != null) {
            Customer customer = new Customer();
            customer.setCustomerId(dto.getCustomer().getCustomerId());
            project.setCustomer(customer);
        }

        // --- Map Project Staff (ProjectConsultants) ---
        if (dto.getProjectStaff() != null) {
            List<ProjectConsultant> projectConsultants = dto.getProjectStaff().stream()
                    .map(pcDTO -> {
                        ProjectConsultant pc = new ProjectConsultant();

                        pc.setProject(project);

                        Consultant consultant = new Consultant();
                        consultant.setId(pcDTO.getConsultantId());
                        consultant.setName(pcDTO.getName());
                        pc.setConsultant(consultant);

                        return pc;
                    }).toList();

            project.setProjectStaff(projectConsultants);
        }

        // Entries are not part of DTO — leave null or empty
        project.setEntries(null);

        return project;

    }

    public ProjectDTO mapToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setStart(project.getStart());
        dto.setEnd(project.getEnd());
        dto.setStatus(project.getStatus());

        // Map customer if present
        if (project.getCustomer() != null) {
            ProjectCustomerDTO customerDTO = new ProjectCustomerDTO();
            customerDTO.setCustomerId(project.getCustomer().getCustomerId());
            customerDTO.setName(project.getCustomer().getName());
            dto.setCustomer(customerDTO);
        }

        // Map consultants through the join entity
        List<ProjectConsultantDTO> staff = project.getProjectStaff().stream()
                .map(pa -> {
                    ProjectConsultantDTO pcDto = new ProjectConsultantDTO();
                    pcDto.setConsultantId(pa.getConsultant().getId());
                    pcDto.setName(pa.getConsultant().getName());
                    return pcDto;
                })
                .toList();

        dto.setProjectStaff(staff);

        return dto;
    }
}


