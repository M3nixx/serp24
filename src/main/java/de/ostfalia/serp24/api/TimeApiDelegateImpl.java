package de.ostfalia.serp24.api;


import de.ostfalia.serp24.model.*;
import de.ostfalia.serp24.service.TimeService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TimeApiDelegateImpl implements TimeApiDelegate{
    private TimeService timeService;
    private ModelMapper modelMapper;

    public TimeApiDelegateImpl(TimeService timeService, ModelMapper mapper) {
        this.timeService = timeService;
        this.modelMapper = mapper;
    }

    @Override
    public ResponseEntity<List<EntryDTO>> getAllEntries() {
        List<Entry> entries = timeService.findAll();
        List<EntryDTO> result;

        result = entries.stream()
                .map(this::mapToDTO)
                .toList();

        return ResponseEntity.ok(result);
    }
    @Override
    public ResponseEntity<List<EntryDTO>> getEntriesByConsultantId(Long consultantId){
        List<Entry> entries = timeService.findByConsultantId(consultantId);
        List<EntryDTO> result;

        result = entries.stream()
                .map(this::mapToDTO)
                .toList();

        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<EntryDTO> createEntry(Long consultantId, EntryDTO entryDTO) {
        Entry entry = modelMapper.map(entryDTO, Entry.class);
        entry = timeService.saveByConsultantId(consultantId, entry);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(mapToDTO(entry));
    }
    @Override
    public ResponseEntity<EntryDTO> updateEntry(Long consultantId, Long entryId, EntryDTO entryDTO){
        Entry entry = modelMapper.map(entryDTO, Entry.class);
        entry = timeService.updateById(consultantId, entryId, entry);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(mapToDTO(entry));
    }

    @Override
    public ResponseEntity<List<EntryProjectDTO>> getAllProjects() {
        List<Project> projects = timeService.findAllProjects();
        List<EntryProjectDTO> result;

        result = projects.stream()
                .map(this::mapToDTO)
                .toList();

        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<List<EntryConsultantDTO>> getAllEntryConsultants() {
        List<Consultant> consultants = timeService.findAllConsultants();
        List<EntryConsultantDTO> result;

        result = consultants.stream()
                .map(consultant -> modelMapper.map(consultant, EntryConsultantDTO.class))
                .toList();

        return ResponseEntity.ok(result);
    }
    public EntryDTO mapToDTO(Entry entry) {
        EntryDTO dto = new EntryDTO();
        dto.setEntryId(entry.getEntryId());
        dto.setDate(entry.getDate());
        dto.setHours(entry.getHours());

        // Map customer if present
        if (entry.getConsultant() != null) {
            EntryConsultantDTO entryConsultantDTO = new EntryConsultantDTO();
            entryConsultantDTO.setConsultantId(entry.getConsultant().getId());
            entryConsultantDTO.setName(entry.getConsultant().getName());
            dto.setConsultant(entryConsultantDTO);
        }

        if(entry.getProject() != null){
            EntryProjectDTO entryProjectDTO = new EntryProjectDTO();
            entryProjectDTO.setProjectId(entry.getProject().getId());
            entryProjectDTO.setName(entry.getProject().getName());
            dto.setProject(entryProjectDTO);

            // Map consultants through the join entity
            List<EntryConsultantDTO> staff = entry.getProject().getProjectStaff().stream()
                    .map(pc -> {
                        EntryConsultantDTO ecDto = new EntryConsultantDTO();
                        ecDto.setConsultantId(pc.getConsultant().getId());
                        ecDto.setName(pc.getConsultant().getName());
                        return ecDto;
                    })
                    .toList();

            dto.getProject().setProjectStaff(staff);

        }
        return dto;
    }
    public EntryProjectDTO mapToDTO(Project project) {
        EntryProjectDTO dto = new EntryProjectDTO();
        dto.setProjectId(project.getId());
        dto.setName(project.getName());

        // Map consultants through the join entity
        List<EntryConsultantDTO> staff = project.getProjectStaff().stream()
                .map(pc -> {
                    EntryConsultantDTO ecDto = new EntryConsultantDTO();
                    ecDto.setConsultantId(pc.getConsultant().getId());
                    ecDto.setName(pc.getConsultant().getName());
                    return ecDto;
                })
                .toList();
        dto.setProjectStaff(staff);

        return dto;
    }
}
