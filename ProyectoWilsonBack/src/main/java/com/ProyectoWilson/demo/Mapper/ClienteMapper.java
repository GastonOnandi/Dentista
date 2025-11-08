package com.ProyectoWilson.demo.Mapper;

import com.ProyectoWilson.demo.DTO.Request.ClienteRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.ClienteResponseDTO;
import com.ProyectoWilson.demo.Entities.Cliente;
import org.springframework.stereotype.Component;

@Component
public class ClienteMapper {
    public Cliente toEntity(ClienteRequestDTO dto){
        Cliente cliente = new Cliente();
        cliente.setCedula(dto.getCedula());
        cliente.setNombre(dto.getNombre());
        cliente.setTelefono(dto.getTelefono());
        cliente.setDireccion(dto.getDireccion());
        return cliente;
    }

    public ClienteResponseDTO toResponseDTO(Cliente cliente){
        ClienteResponseDTO dto = new ClienteResponseDTO();
        dto.setCedula(cliente.getCedula());
        dto.setNombre(cliente.getNombre());
        dto.setDireccion(cliente.getDireccion());
        dto.setTelefono(cliente.getTelefono());
        return dto;
    }
}
