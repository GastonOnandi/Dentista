package com.ProyectoWilson.demo.Mapper;

import com.ProyectoWilson.demo.DTO.Request.TratamientoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TratamientoResponseDTO;
import com.ProyectoWilson.demo.Entities.Tratamiento;
import org.springframework.stereotype.Component;

@Component
public class TratamientoMapper {
    public Tratamiento toEntity(TratamientoRequestDTO dto){
        Tratamiento tratamiento = new Tratamiento();
        tratamiento.setNombre(dto.getNombre());
        tratamiento.setCosto(dto.getCosto());
        return tratamiento;
    }

    public TratamientoResponseDTO toResponseDTO (Tratamiento tratamiento){
        TratamientoResponseDTO dto = new TratamientoResponseDTO();
        dto.setId(tratamiento.getId());
        dto.setNombre(tratamiento.getNombre());
        dto.setCosto(tratamiento.getCosto());
        return dto;
    }
}
