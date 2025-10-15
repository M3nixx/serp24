package de.ostfalia.serp24.config;

import de.ostfalia.serp24.model.Consultant;
import de.ostfalia.serp24.model.ConsultantDTO;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration().setSkipNullEnabled(true);

/*
        modelMapper.createTypeMap(Consultant.class, ConsultantDTO.class);

        modelMapper.createTypeMap(Consultant.class, ConsultantDTO.class, "shallowConsultant")
                .addMappings(mapper -> mapper.skip(ConsultantDTO::setBookedProjects));
*/
        return modelMapper;
    }
}
