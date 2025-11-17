package com.ProyectoWilson.demo.Mapper;

import com.ProyectoWilson.demo.DTO.Response.ClienteConsideracionResponseDTO;
import com.ProyectoWilson.demo.Entities.ClienteConsideracion;
import org.springframework.stereotype.Component;

@Component
public class ClienteConsideracionMapper {
    public ClienteConsideracionResponseDTO toResponseDTO(ClienteConsideracion entidad){
        ClienteConsideracionResponseDTO dto = new ClienteConsideracionResponseDTO();
        dto.setTipo(entidad.getTipo());
        dto.setDetalle(entidad.getDetalle());
        return dto;
    }
}
