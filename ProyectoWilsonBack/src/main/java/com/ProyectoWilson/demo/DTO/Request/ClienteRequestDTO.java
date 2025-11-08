package com.ProyectoWilson.demo.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteRequestDTO {
    private Long cedula;
    private String nombre;
    private Long telefono;
    private String direccion;
}
