package com.ProyectoWilson.demo.DTO.Request;

import com.ProyectoWilson.demo.DTO.Response.ClienteConsideracionResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteRequestDTO {
    private Long cedula;
    private String nombre;
    private Long telefono;
    private String direccion;
    private List<ClienteConsideracionRequestDTO> consideraciones;
}
