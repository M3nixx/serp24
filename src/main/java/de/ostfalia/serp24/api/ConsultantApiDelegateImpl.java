package de.ostfalia.serp24.api;

import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.ConsultantDTO;
import de.ostfalia.serp24.model.Customer;
import de.ostfalia.serp24.model.CustomerDTO;
import de.ostfalia.serp24.repository.ConsultantRepository;
import de.ostfalia.serp24.repository.CustomerRepository;
import de.ostfalia.serp24.service.ConsultantService;
import de.ostfalia.serp24.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Component
public class ConsultantApiDelegateImpl implements ConsultantsApiDelegate{
    private ConsultantService consultantService;
    private ModelMapper modelMapper;

    public ConsultantApiDelegateImpl(ConsultantService consultantService, ModelMapper mapper){
        this.consultantService = consultantService;
        this.modelMapper = mapper;
    }
    @Override
    public ResponseEntity<List<ConsultantDTO>> getConsultants(Boolean shallow){
        List<Consultant> consultants = consultantService.findAll();
        List<ConsultantDTO> result;

        if(shallow){
            for (Consultant c : consultants){
                c.setBookedProjects(null);
            }
            result = consultants.stream()
                    .map(consultant -> modelMapper.map(consultant, ConsultantDTO.class))
                    .toList();
        }
        else {
            result = consultants.stream()
                    .map(consultant -> modelMapper.map(consultant, ConsultantDTO.class))
                    .toList();
        }

        return ResponseEntity.ok(result);
    }
    @Override
    public ResponseEntity<ConsultantDTO> createConsultant(ConsultantDTO consultantDTO) {
        Consultant consultant = modelMapper.map(consultantDTO, Consultant.class);
        consultant = consultantService.save(consultant);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(consultant, ConsultantDTO.class));
    }

    @Override
    public ResponseEntity<ConsultantDTO> getConsultant(Long id) {
        Consultant consultant = consultantService.findById(id);

        return ResponseEntity.ok(modelMapper.map(consultant, ConsultantDTO.class));
    }

    @Override
    public ResponseEntity<ConsultantDTO> updateConsultant(Long id, ConsultantDTO consultantDTO) {
        Consultant consultant = modelMapper.map(consultantDTO, Consultant.class);
        consultant = consultantService.updateById(id, consultant);
        return ResponseEntity.ok(modelMapper.map(consultant, ConsultantDTO.class));
    }

    @Override
    public ResponseEntity<Void> deleteConsultant(Long id) {
        consultantService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
