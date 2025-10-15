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
                .map(entry -> modelMapper.map(entry, EntryDTO.class))
                .toList();

        return ResponseEntity.ok(result);
    }
    @Override
    public ResponseEntity<List<EntryDTO>> getEntriesByConsultantId(Long consultantId){
        List<Entry> entries = timeService.findByConsultantId(consultantId);
        List<EntryDTO> result;

        result = entries.stream()
                .map(entry -> modelMapper.map(entry, EntryDTO.class))
                .toList();

        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<EntryDTO> createEntry(Long consultantId, EntryDTO entryDTO) {
        Entry entry = modelMapper.map(entryDTO, Entry.class);
        entry = timeService.saveByConsultantId(consultantId, entry);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(entry, EntryDTO.class));
    }
    @Override
    public ResponseEntity<EntryDTO> updateEntry(Long consultantId, Long entryId, EntryDTO entryDTO){
        Entry entry = modelMapper.map(entryDTO, Entry.class);
        entry = timeService.updateById(consultantId, entryId, entry);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(entry, EntryDTO.class));
    }

    @Override
    public ResponseEntity<List<EntryProjectDTO>> getAllProjects() {
        List<Project> projects = timeService.findAllProjects();
        List<EntryProjectDTO> result;

        result = projects.stream()
                .map(project -> modelMapper.map(project, EntryProjectDTO.class))
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
}
