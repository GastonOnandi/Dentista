package com.ProyectoWilson.demo.Mapper;

import com.ProyectoWilson.demo.DTO.Request.TurnoRequestDTO;
import com.ProyectoWilson.demo.DTO.Response.TurnoResponseDTO;
import com.ProyectoWilson.demo.Entities.Turno;
import com.ProyectoWilson.demo.Exceptions.Cliente.ClienteNoExiste;
import com.ProyectoWilson.demo.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TurnoMapper {
    @Autowired
    private ClienteRepository clienteRepository;
    public Turno toEntity(TurnoRequestDTO dto){
        Turno turno = new Turno();
        turno.setFecha(dto.getFecha());
        turno.setClienteAsociado(clienteRepository.findById(dto.getCedulaCliente()).orElseThrow(ClienteNoExiste::new));
        return turno;
    }

    public TurnoResponseDTO toResponseDTO(Turno turno){
        TurnoResponseDTO dto = new TurnoResponseDTO();
        dto.setId(turno.getId());
        dto.setFecha(turno.getFecha());
        return dto;
    }
}
